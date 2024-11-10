import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { Order } from '../../models/order.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(this.apiUrl, order);
  }

  updateOrder(id: number, order: Order): Observable<ApiResponse<Order>> {
    return this.http.put<ApiResponse<Order>>(`${this.apiUrl}/${id}`, order);
  }

  getOrders(
    page: number = 1,
    perPage: number = 10,
    status?: string,
    idCustomer?: number
  ): Observable<ApiResponse<{ data: Order[]; total: number }>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (status) params = params.set('status', status);
    if (idCustomer) params = params.set('id_customer', idCustomer.toString());

    return this.http.get<ApiResponse<{ data: Order[]; total: number }>>(this.apiUrl, { params });
  }

  getOrderById(id: number): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/${id}`);
  }

  deleteOrder(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
