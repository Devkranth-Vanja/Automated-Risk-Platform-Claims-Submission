import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PolicyService } from '../../services/policy.service';
import { PolicyDto } from '../../model/PolicyModel';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-edit-policy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.scss']
})
export class EditPolicyComponent implements OnInit {
  policyForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPolicyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { policyId: string },
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (this.data?.policyId) {
      this.loadPolicy(this.data.policyId);
    }
  }

  /** Initialize Reactive Form */
  private initForm(): void {
    this.policyForm = this.fb.group({
      policyId: [''],
      claimantId: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      policyNumber: ['', Validators.required],
      policyType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      policyDescription: ['']
    });
  }

  /** Load policy and claimant info */
  private loadPolicy(id: string): void {
    this.loading = true;
    this.policyService.getPolicyWithClaimantById(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const policy: PolicyDto = res.data;

          // Prepare dates for <input type="date">
          const startDate = policy.startDate ? this.formatDateForInput(policy.startDate) : '';
          const endDate = policy.endDate ? this.formatDateForInput(policy.endDate) : '';

          this.policyForm.patchValue({
            policyId: policy.policyId,
            claimantId: policy.claimantId,
            firstName: policy.claimantDetails?.firstName || '',
            middleName: policy.claimantDetails?.middleName || '',
            lastName: policy.claimantDetails?.lastName || '',
            policyNumber: policy.policyNumber,
            policyType: policy.policyType,
            startDate: startDate,
            endDate: endDate,
            policyDescription: policy.description
          });
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  /** Save updated policy */
  onSave(): void {
    if (this.policyForm.invalid) {
      this.policyForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.policyForm.value;

    const payload: PolicyDto = {
      policyId: formValue.policyId,
      claimantId: formValue.claimantId,
      policyNumber: formValue.policyNumber,
      policyType: formValue.policyType,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      description: formValue.policyDescription,
      claimantDetails: {
        firstName: formValue.firstName,
        middleName: formValue.middleName,
        lastName: formValue.lastName
      }
    };

    this.policyService.updatePolicy(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.dialogRef.close(res.data);
        }
      },
      error: () => {
        this.loading = false;
        alert('Error saving policy.');
      }
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  get f() {
    return this.policyForm.controls;
  }

  /** Convert date to yyyy-MM-dd for <input type="date"> */
  private formatDateForInput(dateValue: string | Date): string {
    const date = new Date(dateValue);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
