import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { CreditAccount } from '../../models/credit-account.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditAccountService {
  private apiUrl = `${environment.apiUrl}/credit_accounts`;

  constructor(private http: HttpClient) {}

  /**
   * Método para obtener una lista paginada de cuentas de crédito con filtros opcionales.
   */
  getCreditAccounts(
    page: number = 1,
    perPage: number = 10,
    idCustomer?: number,
    minBalance?: number,
    maxBalance?: number
  ): Observable<ApiResponse<{ data: CreditAccount[]; total: number }>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (idCustomer) params = params.set('id_customer', idCustomer.toString());
    if (minBalance) params = params.set('min_balance', minBalance.toString());
    if (maxBalance) params = params.set('max_balance', maxBalance.toString());

    return this.http.get<ApiResponse<{ data: CreditAccount[]; total: number }>>(this.apiUrl, { params });
  }

  /**
   * Método para obtener una cuenta de crédito por su ID.
   */
  getCreditAccountById(id: number): Observable<ApiResponse<CreditAccount>> {
    return this.http.get<ApiResponse<CreditAccount>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Método para crear una nueva cuenta de crédito.
   */
  createCreditAccount(
    creditBalance: number,
    dueDate: string,
    idCustomer: number
  ): Observable<ApiResponse<CreditAccount>> {
    const body = { credit_balance: creditBalance, due_date: dueDate, id_customer: idCustomer };
    return this.http.post<ApiResponse<CreditAccount>>(this.apiUrl, body);
  }

  /**
   * Método para actualizar una cuenta de crédito existente.
   */
  updateCreditAccount(
    id: number,
    creditBalance: number,
    dueDate: string,
    idCustomer: number
  ): Observable<ApiResponse<CreditAccount>> {
    const body = { credit_balance: creditBalance, due_date: dueDate, id_customer: idCustomer };
    return this.http.put<ApiResponse<CreditAccount>>(`${this.apiUrl}/${id}`, body);
  }

  /**
   * Método para eliminar una cuenta de crédito por su ID.
   */
  deleteCreditAccount(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
