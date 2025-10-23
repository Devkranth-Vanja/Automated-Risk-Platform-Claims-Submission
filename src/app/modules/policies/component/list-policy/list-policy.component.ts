import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { EditPolicyComponent } from '../edit-policy/edit-policy.component';
import { PolicyService } from '../../services/policy.service';
import { PolicyDto } from '../../model/PolicyModel';
import { NotificationService } from 'src/app/shared/service/toastr.service';
import { catchError, of } from 'rxjs';
import { ViewPolicyComponent } from '../view-policy/view-policy.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, MatIconModule],
  templateUrl: './list-policy.component.html',
  styleUrls: ['./list-policy.component.scss']
})
export class ListPolicyComponent implements OnInit {
  policies: PolicyDto[] = [];
  pagedPolicies: PolicyDto[] = [];
  currentPage = 1;
  pageSize: number | 'All' = 10;
  pageSizeOptions = [10, 25, 50, 100, 'All'];
  totalPages = 1;
  totalPagesArray: number[] = [];
  searchTerm = '';
  sortField = 'policyNumber';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    library: FaIconLibrary,
    private dialog: MatDialog,
    private policyService: PolicyService,
    private toastr: NotificationService
  ) {
    library.addIcons(faEdit, faTrash);
  }

  ngOnInit(): void {
    this.loadPolicies();
  }

  /** ✅ Fetch policies from service */
  loadPolicies(): void {
    this.policyService.getAllPolicies()
      .pipe(
        catchError(err => {
          console.error('Error fetching policies', err);
          this.toastr.error('Failed to load policies');
          return of({ success: false, data: [], message: 'Error fetching policies' });
        })
      )
      .subscribe(res => {
        if (res.success && res.data) {
          this.policies = res.data;
          this.applyFilter();
        } else {
          this.toastr.error(res.message || 'Failed to load policies');
        }
      });
  }


  applyFilter() {
    let filtered = this.policies;
    if (this.searchTerm) {
      filtered = filtered.filter(policy =>
        policy.policyNumber?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.sortPolicies(this.sortField, filtered);
  }

  sortPolicies(field: string, data?: PolicyDto[]) {
    this.sortField = field;
    const source = data || this.policies;
    source.sort((a, b) => {
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.setupPagination(source);
  }

  setupPagination(data: PolicyDto[]) {
    this.totalPages =
      this.pageSize === 'All'
        ? 1
        : Math.ceil(data.length / (this.pageSize as number));
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.goToPage(1, data);
  }

  goToPage(page: number, data?: PolicyDto[]) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const source = data || this.policies;
    const start = (this.currentPage - 1) * (this.pageSize === 'All' ? source.length : (this.pageSize as number));
    const length = this.pageSize === 'All' ? source.length : (this.pageSize as number);
    this.pagedPolicies = source.slice(start, start + length);
  }

  editPolicy(policy: PolicyDto) {
    const dialogRef = this.dialog.open(EditPolicyComponent, {
      width: '85%',
      maxWidth: '1200px',
      height: '85%',
      maxHeight: '900px',
      panelClass: 'custom-modalbox',
      data: { ...policy },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((updated: PolicyDto) => {
      if (updated) {
        const index = this.policies.findIndex(p => p.policyId === updated.policyId);
        if (index !== -1) {
          this.policies[index] = updated;
          this.applyFilter();
        }
      }
    });
  }

  /** ✅ Delete Policy with Confirm Dialog */
  deletePolicy(policyId: string, policyNumber?: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Policy',
        message: `Are you sure you want to delete policy <strong>${policyNumber || ''}</strong>?`,
        type: 'warn',
        confirmText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.policyService.deletePolicy(policyId).subscribe({
          next: (res) => {
            if (res.success) {
              this.toastr.success(res.message || 'Policy deleted successfully');
              this.policies = this.policies.filter(p => p.policyId !== policyId);
              this.applyFilter();
            } else {
              this.toastr.error(res.message || 'Failed to delete policy');
            }
          },
          error: (err) => {
            console.error(err);
            this.toastr.error('Failed to delete policy');
          }
        });
      }
    });
  }

  onViewPolicy(policyId: string) {
    this.dialog.open(ViewPolicyComponent, {
      width: '700px',
      data: { policyId }
    });
  }
}
