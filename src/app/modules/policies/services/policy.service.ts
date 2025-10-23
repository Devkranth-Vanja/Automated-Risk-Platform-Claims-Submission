import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { PolicyDto } from '../model/PolicyModel';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { NotificationService } from 'src/app/shared/service/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private apiUrl = 'https://localhost:7041/api/v1/Policy';

  constructor(private http: HttpClient, private toastr: NotificationService) { }

  /** Create a new policy */
  createPolicy(policy: PolicyDto): Observable<ApiResponse<PolicyDto>> {
    return this.http.post<ApiResponse<PolicyDto>>(this.apiUrl, policy)
      .pipe(
        catchError(err => this.handleError(err, 'Failed to create policy'))
      );
  }

  /** Fetch all policies */
  getAllPolicies(): Observable<ApiResponse<PolicyDto[]>> {
    return this.http.get<ApiResponse<PolicyDto[]>>(this.apiUrl)
      .pipe(
        catchError(err => this.handleError(err, 'Failed to fetch policies'))
      );
  }

  /** Fetch basic policy info by ID */
  getBasicPolicyById(id: string): Observable<ApiResponse<PolicyDto>> {
    const url = `${this.apiUrl}/basic/${id}`;
    return this.http.get<ApiResponse<PolicyDto>>(url)
      .pipe(
        catchError(err => this.handleError(err, 'Failed to fetch basic policy info'))
      );
  }

  /** Fetch policy info along with claimant details */
  getPolicyWithClaimantById(id: string): Observable<ApiResponse<PolicyDto>> {
    const url = `${this.apiUrl}/details/${id}`;
    return this.http.get<ApiResponse<PolicyDto>>(url)
      .pipe(
        catchError(err => this.handleError(err, 'Failed to fetch policy with claimant info'))
      );
  }

  /** Update existing policy */
  updatePolicy(policy: PolicyDto): Observable<ApiResponse<PolicyDto>> {
    return this.http.put<ApiResponse<PolicyDto>>(`${this.apiUrl}/${policy.policyId}`, policy)
      .pipe(
        catchError(err => this.handleError(err, 'Failed to update policy'))
      );
  }

  /** Soft delete policy by ID */
  deletePolicy(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err, 'Failed to delete policy'))
      );
  }

  /** Generic error handler */
  private handleError(err: any, defaultMessage: string): Observable<any> {
    console.error('[PolicyService] API Error:', err);
    const message = err?.error?.message || defaultMessage;
    this.toastr.error(message, 'Error');
    return of({ data: null, success: false, message } as ApiResponse<any>);
  }
}
