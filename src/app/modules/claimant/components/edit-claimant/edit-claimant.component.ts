import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClaimantService } from '../../services/claimant.service';
import { NotificationService } from 'src/app/shared/service/toastr.service';
import { ROUTES } from 'src/app/core/constants/routes.contants';
import { Claimant } from '../../models/claimant';

@Component({
  selector: 'app-edit-claimant',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-claimant.component.html',
  styleUrls: ['./edit-claimant.component.scss'],
})
export class EditClaimantComponent implements OnInit {

  claimantForm!: FormGroup;
  isSubmitting = false;
  isLoading = false;
  claimantId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private claimantService: ClaimantService,
    private toastr: NotificationService
  ) { }

  ngOnInit(): void {
    this.claimantId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    if (this.claimantId) {
      this.loadClaimant(this.claimantId);
    }
  }

  /** Initialize Reactive Form */
  private initForm(): void {
    this.claimantForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      nationality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-+()\s]+$/)]],
      altPhone: [''],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      passport: [''],
      driverLicense: [''],
      taxId: [''],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{12,19}$/)]],
      cardExpiry: ['', Validators.required],
      cardCVV: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardHolder: ['', Validators.required],
      notes: ['']
    }, { validators: this.emailsMatchValidator });
  }

  /** Custom validator to check if emails match */
  private emailsMatchValidator(form: FormGroup) {
    const email = form.get('email')?.value;
    const confirm = form.get('confirmEmail')?.value;
    return email && confirm && email !== confirm ? { emailsMismatch: true } : null;
  }

  /** Load claimant data from API */
  private loadClaimant(id: string): void {
    this.isLoading = true;
    this.claimantService.getClaimantById(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const data: Claimant = res.data;
          this.claimantForm.patchValue(data);
        }
      },
      error: (err) => {
        console.error('Error loading claimant:', err);
        this.toastr.error('Failed to load claimant details');
        this.router.navigate([ROUTES.CLAIMANTS.LIST]);
      },
      complete: () => this.isLoading = false
    });
  }

  /** Submit updated data */
  onSubmit(): void {
    if (this.claimantForm.invalid) {
      this.claimantForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const payload = {
      ...this.claimantForm.value,
      claimantId: this.claimantId
    };

    this.claimantService.updateExistingClaimant(this.claimantId, payload)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('Claimant updated successfully');
            this.router.navigate([ROUTES.CLAIMANTS.LIST]);
          } else {
            this.toastr.error(res.message || 'Failed to update claimant');
          }
        },
        error: (err) => {
          console.error('Error updating claimant:', err);
          this.toastr.error('Failed to update claimant');
        },
        complete: () => this.isSubmitting = false
      });
  }

  /** Clear form */
  clearForm(): void {
    this.claimantForm.reset();
  }

  /** Getter for easy access to form controls in template */
  get f() {
    return this.claimantForm.controls;
  }
}
