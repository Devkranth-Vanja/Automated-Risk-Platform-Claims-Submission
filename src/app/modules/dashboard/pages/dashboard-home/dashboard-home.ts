import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,           // ✅ Needed for ngFor, ngIf, etc.
    DecimalPipe,            // ✅ Enables number pipe
    DatePipe,               // ✅ Enables date pipe
    MatCardModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss']
})
export class DashboardHome implements OnInit {
  // Summary data
  totalClaims = 2543;
  approvedClaims = 1820;
  pendingClaims = 480;
  rejectedClaims = 243;

  // Mock claims trend chart data (for Chart.js or ApexCharts)
  claimsTrend = [
    { month: 'Jan', processed: 150 },
    { month: 'Feb', processed: 180 },
    { month: 'Mar', processed: 210 },
    { month: 'Apr', processed: 250 },
    { month: 'May', processed: 280 },
    { month: 'Jun', processed: 310 },
    { month: 'Jul', processed: 295 },
    { month: 'Aug', processed: 330 },
    { month: 'Sep', processed: 355 },
  ];

  // Mock claim type distribution (pie chart)
  claimTypeDistribution = [
    { type: 'Health', value: 45 },
    { type: 'Dental', value: 25 },
    { type: 'Vision', value: 15 },
    { type: 'Pharmacy', value: 10 },
    { type: 'Other', value: 5 }
  ];

  // Recent claims table
  recentClaims = [
    { id: 'CLM-1001', claimant: 'John Doe', type: 'Health', status: 'Approved', amount: 320.75, date: new Date('2025-09-28') },
    { id: 'CLM-1002', claimant: 'Sarah Smith', type: 'Dental', status: 'Pending', amount: 120.50, date: new Date('2025-09-29') },
    { id: 'CLM-1003', claimant: 'David Lee', type: 'Vision', status: 'Rejected', amount: 90.00, date: new Date('2025-09-27') },
    { id: 'CLM-1004', claimant: 'Maria Garcia', type: 'Pharmacy', status: 'Approved', amount: 56.30, date: new Date('2025-09-25') },
    { id: 'CLM-1005', claimant: 'James Brown', type: 'Health', status: 'Pending', amount: 210.40, date: new Date('2025-09-24') },
  ];

  ngOnInit() {}

  // Badge color for claim status
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Approved': return 'bg-success';
      case 'Pending': return 'bg-warning text-dark';
      case 'Rejected': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}