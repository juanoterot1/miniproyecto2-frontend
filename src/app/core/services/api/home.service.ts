import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../models/api-response.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/v1/util`;

  constructor(private http: HttpClient) {}

  getTodayAppointments(): Observable<string> {
    return this.http.get<ApiResponse<{ total: string }[]>>(`${this.apiUrl}/dates/today`).pipe(
      map(response => response.result[0]?.total || '0')
    );
  }

  getTodayActiveAppointments(): Observable<string> {
    return this.http.get<ApiResponse<{ total: string }[]>>(`${this.apiUrl}/dates/today-active`).pipe(
      map(response => response.result[0]?.total || '0')
    );
  }

  getTotalAppointments(): Observable<string> {
    return this.http.get<ApiResponse<{ total: string }[]>>(`${this.apiUrl}/dates/total`).pipe(
      map(response => response.result[0]?.total || '0')
    );
  }
}