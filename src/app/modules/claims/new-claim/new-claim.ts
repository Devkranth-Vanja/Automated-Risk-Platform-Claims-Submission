import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-claim',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-claim.html',
  styleUrls: ['./new-claim.scss']
})
export class NewClaim implements OnInit {
  claimForm!: FormGroup;
  selectedFiles: File[] = [];
  currentTab = 'claimant';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      claimantEmail: ['', [Validators.required, Validators.email]],
      claimantPhone: [''],
      policyNumber: ['', Validators.required],
      claimType: ['', Validators.required],
      claimAmount: ['', [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
      incidentDate: ['', Validators.required],
      incidentLocation: ['', Validators.required],
      claimDescription: ['', Validators.required],
      attachments: [null]
    });
  }

  selectTab(tab: string) {
    this.currentTab = tab;
  }

  nextTab() {
    if (this.currentTab === 'claimant') this.currentTab = 'details';
    else if (this.currentTab === 'details') this.currentTab = 'attachments';
  }

  prevTab() {
    if (this.currentTab === 'attachments') this.currentTab = 'details';
    else if (this.currentTab === 'details') this.currentTab = 'claimant';
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.claimForm.invalid) {
      this.claimForm.markAllAsTouched();
      return;
    }
    const claimData = { ...this.claimForm.value, attachments: this.selectedFiles };
    console.log('Submitted Claim:', claimData);
    alert('✅ Claim submitted successfully!');
    this.clearForm();
  }

  clearForm() {
    this.claimForm.reset();
    this.selectedFiles = [];
    this.currentTab = 'claimant';
  }
}