import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { Sale } from '../../models/sale.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  // Crear una nueva venta
  createSale(sale: Sale): Observable<ApiResponse<Sale>> {
    return this.http.post<ApiResponse<Sale>>(this.apiUrl, sale);
  }

  // Obtener ventas con paginación
  getSales(
    page: number = 1,
    perPage: number = 10
  ): Observable<ApiResponse<{ data: Sale[]; total: number }>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<ApiResponse<{ data: Sale[]; total: number }>>(this.apiUrl, { params });
  }

  // Obtener una venta por su ID
  getSaleById(id: number): Observable<ApiResponse<Sale>> {
    return this.http.get<ApiResponse<Sale>>(`${this.apiUrl}/${id}`);
  }

  // Eliminar una venta por su ID
  deleteSale(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
