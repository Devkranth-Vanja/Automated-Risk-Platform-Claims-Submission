import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { Claimant } from '../../models/claimant';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants/routes.contants';
import { ClaimantService } from '../../services/claimant.service';
import { NotificationService } from 'src/app/shared/service/toastr.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-list-claimants',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, MaterialModule],
  templateUrl: './list-claimants.component.html',
  styleUrls: ['./list-claimants.component.scss']
})
export class ListClaimantsComponent implements OnInit {
  claimants: Claimant[] = [];
  pagedClaimants: Claimant[] = [];
  currentPage = 1;
  pageSize: number | 'All' = 10;
  pageSizeOptions = [10, 25, 50, 100, 'All'];
  totalPages = 1;
  totalPagesArray: number[] = [];
  searchTerm = '';
  sortField: keyof Claimant = 'firstName';
  sortDirection: 'asc' | 'desc' = 'asc';
  isLoading = false;

  // Icons
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private library: FaIconLibrary,
    private dialog: MatDialog,
    private router: Router,
    private claimantService: ClaimantService,
    private toastr: NotificationService
  ) {
    library.addIcons(faEdit, faTrash);
  }

  ngOnInit(): void {
    this.toastr.success('Claimant saved successfully!');
    this.loadClaimants();
  }

  /** ✅ Fetch all claimants from API */
  loadClaimants(): void {
    this.isLoading = true;
    this.claimantService.getAllClaimants().subscribe({
      next: (response) => {
        // ✅ Handle both array and wrapped API response
        const result = Array.isArray(response)
          ? response
          : (response as any)?.data || [];

        this.claimants = result || [];
        if (!Array.isArray(this.claimants)) this.claimants = [];

        this.applyFilter();
      },
      error: (err) => {
        console.error('Error loading claimants:', err);
        this.toastr.error('Failed to load claimants');
        this.claimants = [];
      },
      complete: () => (this.isLoading = false)
    });
  }


  /** ✅ Filter, sort, and paginate */
  applyFilter(): void {
    let filtered = this.claimants;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.firstName?.toLowerCase().includes(term) ||
        c.lastName?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term)
      );
    }
    this.sortClaimants(this.sortField, filtered);
  }

  sortClaimants(field: keyof Claimant, data?: Claimant[]): void {
    this.sortField = field;
    const source = data || this.claimants;
    source.sort((a, b) => {
      const valA = (a[field] ?? '').toString().toLowerCase();
      const valB = (b[field] ?? '').toString().toLowerCase();
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.setupPagination(source);
  }

  setupPagination(data: Claimant[]): void {
    this.totalPages =
      this.pageSize === 'All'
        ? 1
        : Math.ceil(data.length / (this.pageSize as number));
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.goToPage(1, data);
  }

  goToPage(page: number, data?: Claimant[]): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const source = data || this.claimants;
    const start = (this.currentPage - 1) * (this.pageSize === 'All' ? source.length : (this.pageSize as number));
    const length = this.pageSize === 'All' ? source.length : (this.pageSize as number);
    this.pagedClaimants = source.slice(start, start + length);
  }

  /** ✅ Navigate to edit page */
  editClaimant(claimant: Claimant): void {
    this.router.navigate([ROUTES.CLAIMANTS.EDIT(claimant.claimantId)]);
  }

  /** ✅ Delete claimant via API */
  deleteClaimant(claimant: Claimant): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Claimant',
        message: `Are you sure you want to delete claimant <strong>${claimant.firstName} ${claimant.lastName}</strong>?`,
        type: 'warn', // 'warn' | 'info' | 'success'
        confirmText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.claimantService.deleteExistingClaimant(String(claimant.claimantId)).subscribe({
          next: () => {
            this.toastr.success('Claimant deleted successfully');
            this.loadClaimants();
          },
          error: (err) => {
            console.error('Delete failed:', err);
            this.toastr.error('Failed to delete claimant');
          }
        });
      }
    });
  }


}