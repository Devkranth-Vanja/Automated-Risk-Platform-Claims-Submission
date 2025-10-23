import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PolicyService } from '../../services/policy.service';
@Component({
  selector: 'app-view-policy',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="policy-modal">
      <!-- Header -->
      <div class="policy-header">
        <img src="assets/company-logo.png" alt="Company Logo" class="logo" />
        <h2>{{ policy?.policyType | uppercase }} INSURANCE POLICY</h2>
        <p class="policy-number">Policy #: {{ policy?.policyNumber }}</p>
      </div>

      <!-- Scrollable Policy Content -->
      <div class="policy-content" #printSection>
        <!-- Claimant Details -->
        <section class="section claimant">
          <h4>Claimant Details</h4>
          <table class="details-table">
            <tr><td><strong>Name</strong></td>
                <td>{{ policy?.claimantDetails?.firstName }} {{ policy?.claimantDetails?.middleName }} {{ policy?.claimantDetails?.lastName }}</td></tr>
            <tr><td><strong>Email</strong></td><td>{{ policy?.claimantDetails?.email || 'N/A' }}</td></tr>
            <tr><td><strong>Phone</strong></td><td>{{ policy?.claimantDetails?.phone || 'N/A' }}</td></tr>
            <tr><td><strong>Address</strong></td><td>{{ policy?.claimantDetails?.address || 'N/A' }}</td></tr>
          </table>
        </section>

        <hr />

        <!-- Policy Details -->
        <section class="section policy-details">
          <h4>Policy Details</h4>
          <table class="details-table">
            <tr><td><strong>Type</strong></td><td>{{ policy?.policyType }}</td></tr>
            <tr><td><strong>Start Date</strong></td><td>{{ policy?.startDate | date:'longDate' }}</td></tr>
            <tr><td><strong>End Date</strong></td><td>{{ policy?.endDate | date:'longDate' }}</td></tr>
            <tr><td><strong>Description</strong></td><td>{{ policy?.description }}</td></tr>
          </table>
        </section>

        <hr />

        <!-- Coverage -->
        <section class="section coverage">
          <h4>Coverage Details</h4>
          <div [ngSwitch]="policy?.policyType">
            <p *ngSwitchCase="'Health'">Hospitalization, doctor visits, prescriptions, preventive care.</p>
            <p *ngSwitchCase="'Accident'">Accidental death, permanent disability, medical expenses.</p>
            <p *ngSwitchCase="'Dental'">Routine checkups, cleaning, major dental procedures.</p>
            <p *ngSwitchCase="'Vision'">Eye exams, glasses, contact lenses.</p>
          </div>
        </section>

        <hr />

        <!-- Terms & Conditions -->
        <section class="section terms">
          <h4>Terms & Conditions</h4>
          <ol>
            <li>Policy coverage is subject to the terms outlined in this document.</li>
            <li>Claims must be reported within 30 days of incident.</li>
            <li>Premium payments must be made on time to maintain coverage.</li>
            <li>All disputes are governed by the local insurance laws.</li>
          </ol>
        </section>

        <hr />

        <!-- Signature -->
        <section class="section signature-section">
          <div class="signature">
            <p>__________________________</p>
            <p>Authorized Signatory</p>
          </div>
          <div class="signature">
            <p>__________________________</p>
            <p>Policyholder Signature</p>
          </div>
        </section>
      </div>

      <!-- Fixed Action Buttons -->
      <div class="actions">
        <button mat-button color="primary" (click)="printPolicy()">🖨 Print</button>
        <button mat-button mat-dialog-close>Close</button>
      </div>
    </div>
  `,
  styles: [`
    .policy-modal {
      display: flex;
      flex-direction: column;
      padding: 20px;
      max-width: 900px;
      max-height: 90vh;  /* Limit modal height */
    }

    .policy-header {
      text-align: center;
      margin-bottom: 10px;
      background-color: #004080;
      color: white;
      padding: 15px;
      border-radius: 5px;
    }

    .logo { height: 50px; margin-bottom: 10px; }
    .policy-number { font-weight: bold; margin-top: 5px; }

    /* Scrollable content */
    .policy-content {
      border: 1px solid #ccc;
      padding: 20px;
      background: #fff;
      overflow-y: auto; /* Scroll if content is too tall */
      flex: 1 1 auto;
    }

    .section { margin-bottom: 20px; page-break-inside: avoid; }
    .section h4 { background-color: #f2f2f2; padding: 8px; border-left: 5px solid #004080; margin-bottom: 10px; }
    .details-table { width: 100%; border-collapse: collapse; }
    .details-table td { padding: 6px 10px; border: 1px solid #ccc; }
    hr { margin: 20px 0; border-color: #ddd; page-break-after: avoid; }

    .signature-section { display: flex; justify-content: space-between; margin-top: 40px; page-break-inside: avoid; }
    .signature p { margin: 0; text-align: center; }

    /* Fixed buttons */
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      flex-shrink: 0;
    }

    /* Print styles */
    @media print {
      body * { visibility: hidden; }
      .policy-content, .policy-content * { visibility: visible; }
      .policy-content { position: absolute; left: 0; top: 0; width: 100%; }
      .section { page-break-inside: avoid; }
      hr { page-break-after: avoid; }
      .signature-section { page-break-inside: avoid; }
    }
  `]
})
export class ViewPolicyComponent implements OnInit {
  policy: any;

  constructor(
    private dialogRef: MatDialogRef<ViewPolicyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { policyId: string },
    private policyService: PolicyService
  ) { }

  ngOnInit() {
    this.loadPolicy(this.data.policyId);
  }

  private loadPolicy(id: string) {
    this.policyService.getPolicyWithClaimantById(id).subscribe(res => {
      if (res.success && res.data) {
        this.policy = res.data;
      }
    });
  }

  printPolicy() {
    const printContents = document.querySelector('.printable-area')?.innerHTML;
    if (printContents) {
      const popupWin = window.open('', '_blank', 'width=900,height=700');
      popupWin!.document.open();
      popupWin!.document.write(`
      <html>
        <head>
          <title>Print Policy</title>
          <style>
            /* Reset default margins */
            @page { margin: 20mm; }
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }

            /* Scale modal content to fit width */
            .policy-modal {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              padding: 0;
            }

            /* Headers */
            h2 { text-align: center; color: #004080; }
            h4 { background-color: #f2f2f2; padding: 8px; border-left: 5px solid #004080; margin-bottom: 10px; }

            /* Tables */
            table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
            td { padding: 6px 10px; border: 1px solid #ccc; }

            /* Lists */
            ol { padding-left: 20px; }

            /* Sections & Signature */
            .section { margin-bottom: 20px; page-break-inside: avoid; }
            hr { margin: 20px 0; border-color: #ddd; page-break-after: avoid; }
            .signature-section { display: flex; justify-content: space-between; margin-top: 40px; page-break-inside: avoid; }
            .signature p { margin: 0; text-align: center; }

            /* Remove scrollbars */
            .policy-content {
              overflow: visible !important;
              max-height: none !important;
            }

            /* Ensure all visible content prints */
            * { visibility: visible; }
          </style>
        </head>
        <body>
          <div class="policy-modal">
            ${printContents}
          </div>
        </body>
      </html>
    `);
      popupWin!.document.close();
      popupWin!.print();
    }
  }

}

