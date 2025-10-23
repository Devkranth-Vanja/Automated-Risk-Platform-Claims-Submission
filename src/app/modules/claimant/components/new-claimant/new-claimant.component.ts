import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

// Services
import { ClaimantService } from '../../services/claimant.service';
import { NotificationService } from 'src/app/shared/service/toastr.service';

// Models
import { Claimant } from '../../models/claimant';
import { ApiResponse } from 'src/app/core/models/ApiResponse';


@Component({
  selector: 'app-new-claimant',
  templateUrl: './new-claimant.component.html',
  styleUrls: ['./new-claimant.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class NewClaimantComponent implements OnInit, OnDestroy {

  claimantForm!: FormGroup;
  isSubmitting = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private claimantService: ClaimantService,
    private toastr: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  /** Initialize form with validators */
  private initializeForm(): void {
    this.claimantForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      maritalStatus: [''],
      nationality: [''],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      altPhone: [''],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\- ]{4,10}$/)]],
      country: ['', [Validators.required]],
      passport: [''],
      driverLicense: [''],
      taxId: [''],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{13,19}$/)]],
      cardExpiry: ['', [Validators.required]],
      cardCVV: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      cardHolder: ['', [Validators.required]],
      notes: ['']
    }, { validators: this.matchEmails });
  }

  /** Custom validator to ensure email and confirmEmail match */
  private matchEmails(group: AbstractControl): { [key: string]: boolean } | null {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    return email && confirmEmail && email !== confirmEmail ? { emailsMismatch: true } : null;
  }

  /** Handle form submission */
  onSubmit(): void {
    if (this.claimantForm.invalid) {
      this.claimantForm.markAllAsTouched();
      this.toastr.error('Please fix the highlighted errors before submitting.');
      return;
    }

    const claimantData: Claimant = this.claimantForm.value;
    this.isSubmitting = true;

    this.claimantService.createNewClaimant(claimantData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ApiResponse<Claimant>) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.clearForm();
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          console.error('Claimant creation failed:', err);
          // Error toastr already shown by service
        },
        complete: () => this.isSubmitting = false
      });
  }

  /** Reset the form */
  clearForm(): void {
    this.claimantForm.reset();
  }

  /** Getter for easier template access */
  get f() {
    return this.claimantForm.controls;
  }

  /** Cleanup to prevent memory leaks */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
