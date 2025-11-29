import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Claimant } from '../models/claimant';
import { environment } from 'src/environments/environment.dev';
import { NotificationService } from 'src/app/shared/service/toastr.service';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
@Injectable({
  providedIn: 'root'
})
export class ClaimantService {
  private readonly baseUrl = `${environment.claimServiceApiUrl}/Claimant`;

  constructor(
    private http: HttpClient,
    private toastrService: NotificationService
  ) { }

  getAllClaimants(includeDeleted = false): Observable<ApiResponse<Claimant[]>> {
    return this.http
      .get<ApiResponse<Claimant[]>>(`${this.baseUrl}?includeDeleted=${includeDeleted}`)
      .pipe(
        retry(2),
        tap(res => console.log('Fetched claimants', res)),
        catchError((error) => this.handleError(error))
      );
  }

  getClaimantById(id: string): Observable<ApiResponse<Claimant>> {
    return this.http
      .get<ApiResponse<Claimant>>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  createNewClaimant(claimant: Claimant): Observable<ApiResponse<Claimant>> {
    return this.http
      .post<ApiResponse<Claimant>>(this.baseUrl, claimant)
      .pipe(
        tap(res => {
          if (res.success) this.toastrService.success(res.message);
          else this.toastrService.error(res.message);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  updateExistingClaimant(id: string, claimant: Claimant): Observable<ApiResponse<unknown>> {
    return this.http
      .put<ApiResponse<unknown>>(`${this.baseUrl}/${id}`, claimant)
      .pipe(
        tap(res => {
          if (res.success) this.toastrService.success(res.message);
          else this.toastrService.error(res.message);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  deleteExistingClaimant(id: string): Observable<ApiResponse<unknown>> {
    return this.http
      .delete<ApiResponse<unknown>>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(res => {
          if (res.success) this.toastrService.success(res.message);
          else this.toastrService.error(res.message);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unexpected error occurred.';

    if (error.error instanceof ErrorEvent) {
      message = `Network error: ${error.error.message}`;
    } else {
      switch (true) {
        case error.status === 0:
          message = 'Unable to connect to the server.';
          break;
        case error.status >= 400 && error.status < 500:
          message = error.error?.message || 'Invalid request or data.';
          break;
        case error.status >= 500:
          message = error.error?.message || 'Server error occurred. Please try again later.';
          break;
      }
    }

    console.error('[ClaimantService] API Error:', error);
    this.toastrService.error(message, 'Error');
    return throwError(() => new Error(message));
  }
}
