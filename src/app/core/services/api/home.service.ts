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
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // Total de órdenes
  getTotalOrders(): Observable<string> {
    return this.http.get<ApiResponse<{ total_orders: number }>>(`${this.apiUrl}/statistics`).pipe(
      map(response => response.result.total_orders.toString())
    );
  }

  // Total de órdenes completadas
  getTotalCompletedOrders(): Observable<string> {
    return this.http.get<ApiResponse<{ total_completed_orders: number }>>(`${this.apiUrl}/statistics`).pipe(
      map(response => response.result.total_completed_orders.toString())
    );
  }

  // Total de órdenes pendientes
  getTotalPendingOrders(): Observable<string> {
    return this.http.get<ApiResponse<{ total_pending_orders: number }>>(`${this.apiUrl}/statistics`).pipe(
      map(response => response.result.total_pending_orders.toString())
    );
  }

  // Top 3 clientes con más ventas completadas
  getTopCustomers(): Observable<{ customer_name: string; completed_order_count: number }[]> {
    return this.http.get<ApiResponse<{ customer_name: string; completed_order_count: number }[]>>(`${this.apiUrl}/top-customers`).pipe(
      map(response => response.result || [])
    );
  }

  // Top 3 productos más vendidos
  getTopSellingProducts(): Observable<{ product_name: string; total_quantity_sold: number }[]> {
    return this.http.get<ApiResponse<{ product_name: string; total_quantity_sold: number }[]>>(`${this.apiUrl}/top-products`).pipe(
      map(response => response.result || [])
    );
  }
}
