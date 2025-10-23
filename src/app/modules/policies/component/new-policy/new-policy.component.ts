import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

// Services
import { PolicyService } from '../../services/policy.service';
import { NotificationService } from 'src/app/shared/service/toastr.service';
import { ClaimantService } from 'src/app/modules/claimant/services/claimant.service';

// Models
import { PolicyDto } from '../../model/PolicyModel';

@Component({
  selector: 'app-new-policy',
  templateUrl: './new-policy.component.html',
  styleUrls: ['./new-policy.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class NewPolicyComponent implements OnInit, OnDestroy {

  policyForm!: FormGroup;
  claimants: any[] = [];
  isSubmitting = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private policyService: PolicyService,
    private claimantService: ClaimantService,
    private toastr: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadClaimants();
  }

  /** Initialize form with validators */
  private initializeForm(): void {
    this.policyForm = this.fb.group({
      claimantId: ['', Validators.required],
      policyNumber: ['', Validators.required],
      policyType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      policyDescription: ['']
    });
  }

  /** Load claimants for the dropdown */
  private loadClaimants(): void {
    this.claimantService.getAllClaimants()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          if (res.success) {
            this.claimants = res.data;
            console.log('Fetched claimants', res);
          } else {
            this.toastr.error(res.message || 'Failed to load claimants.');
          }
        },
        error: err => {
          console.error('[ClaimantService] API Error:', err);
          this.toastr.error('Failed to load claimants.');
        }
      });
  }

  /** Handle form submission */
  onSubmit(): void {
    if (this.policyForm.invalid) {
      this.policyForm.markAllAsTouched();
      this.toastr.error('Please fix the highlighted errors before submitting.');
      return;
    }

    const formValue = this.policyForm.value;

    if (!formValue.claimantId) {
      this.toastr.error('Please select a claimant.');
      return;
    }

    const policyData: PolicyDto = {
      policyId: '00000000-0000-0000-0000-000000000000', // Guid.Empty for backend
      claimantId: formValue.claimantId,
      policyNumber: formValue.policyNumber,
      policyType: formValue.policyType,
      startDate: new Date(formValue.startDate).toISOString(),
      endDate: new Date(formValue.endDate).toISOString(),
      description: formValue.policyDescription
    };

    this.isSubmitting = true;
    console.log('Incoming Policy Data', policyData);

    this.policyService.createPolicy(policyData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message || 'Policy created successfully.');
            this.clearForm();
          } else {
            this.toastr.error(res.message || 'Failed to create policy.');
          }
        },
        error: (err) => {
          console.error('[PolicyService] API Error:', err);
          const apiMessage = err?.error?.message || 'Failed to create policy.';
          this.toastr.error(apiMessage);
        },
        complete: () => this.isSubmitting = false
      });
  }

  /** Reset the form */
  clearForm(): void {
    this.policyForm.reset();
  }

  /** Getter for easier template access */
  get f(): { [key: string]: AbstractControl } {
    return this.policyForm.controls;
  }

  /** Cleanup subscriptions */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
