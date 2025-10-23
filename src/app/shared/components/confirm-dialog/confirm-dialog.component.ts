import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'translateY(20px)', opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div @slideUp class="dialog-container">
      <!-- Header -->
      <div class="dialog-header flex items-center gap-2 text-white p-3 rounded-t-md" [ngClass]="headerClass">
        <mat-icon>{{ icon }}</mat-icon>
        <h2 class="text-lg font-semibold">{{ data.title || 'Confirm Action' }}</h2>
      </div>

      <!-- Content -->
      <mat-dialog-content class="p-4">
        <p class="text-gray-700 text-base leading-relaxed" [innerHTML]="data.message"></p>
      </mat-dialog-content>

      <!-- Actions -->
      <mat-dialog-actions align="end" class="px-4 pb-3 border-t border-gray-200">
        <button mat-button (click)="onCancel()" class="text-gray-600">Cancel</button>
        <button mat-flat-button [ngClass]="buttonClass" class="px-4 text-white" (click)="onConfirm()">
          {{ data.confirmText || 'Confirm' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.25);
    }
    .header-warn { background-color: #dc2626; } /* red */
    .header-info { background-color: #2563eb; } /* blue */
    .header-success { background-color: #16a34a; } /* green */
    .btn-warn { background-color: #dc2626; }
    .btn-info { background-color: #2563eb; }
    .btn-success { background-color: #16a34a; }
    button[mat-button]:hover { background: rgba(0,0,0,0.05); }
  `]
})
export class ConfirmDialogComponent {
  headerClass = 'header-warn';
  buttonClass = 'btn-warn';
  icon = 'warning';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title?: string;
      message: string;
      type?: 'warn' | 'info' | 'success';
      confirmText?: string;
    }
  ) {
    this.applyTheme(data.type || 'warn');
  }

  applyTheme(type: 'warn' | 'info' | 'success'): void {
    switch (type) {
      case 'info':
        this.headerClass = 'header-info';
        this.buttonClass = 'btn-info';
        this.icon = 'info';
        break;
      case 'success':
        this.headerClass = 'header-success';
        this.buttonClass = 'btn-success';
        this.icon = 'check_circle';
        break;
      default:
        this.headerClass = 'header-warn';
        this.buttonClass = 'btn-warn';
        this.icon = 'warning';
        break;
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
