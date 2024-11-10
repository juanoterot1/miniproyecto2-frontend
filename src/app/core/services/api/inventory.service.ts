import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { Inventory } from '../../models/inventory.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient) {}

  createInventoryItem(inventory: Inventory): Observable<ApiResponse<Inventory>> {
    return this.http.post<ApiResponse<Inventory>>(this.apiUrl, inventory);
  }

  getInventoryItems(
    page: number = 1,
    perPage: number = 10,
    productId?: number,
    minStock?: number,
    maxStock?: number
  ): Observable<ApiResponse<{ data: Inventory[]; total: number }>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (productId) params = params.set('product_id', productId.toString());
    if (minStock) params = params.set('min_stock', minStock.toString());
    if (maxStock) params = params.set('max_stock', maxStock.toString());

    return this.http.get<ApiResponse<{ data: Inventory[]; total: number }>>(this.apiUrl, { params });
  }

  getInventoryItemById(id: number): Observable<ApiResponse<Inventory>> {
    return this.http.get<ApiResponse<Inventory>>(`${this.apiUrl}/${id}`);
  }

  updateInventoryItem(id: number, inventory: Inventory): Observable<ApiResponse<Inventory>> {
    return this.http.put<ApiResponse<Inventory>>(`${this.apiUrl}/${id}`, inventory);
  }

  deleteInventoryItem(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
