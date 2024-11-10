import { Component, OnInit } from '@angular/core';
import { CreditAccountService } from '../../../../core/services/api/credit-account.service';
import { CreditAccount } from '../../../../core/models/credit-account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credit-account-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-account-list.component.html'
})
export class CreditAccountListComponent implements OnInit {
  creditAccounts: CreditAccount[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  minBalanceFilter?: number;
  maxBalanceFilter?: number;
  idCustomerFilter?: number;
  showFilters: boolean = false;

  constructor(
    private creditAccountService: CreditAccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.fetchCreditAccounts();
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  resetFilters(): void {
    this.minBalanceFilter = undefined;
    this.maxBalanceFilter = undefined;
    this.idCustomerFilter = undefined;
    this.currentPage = 1;
    this.fetchCreditAccounts();
  }

  fetchCreditAccounts(): void {
    this.creditAccountService.getCreditAccounts(
      this.currentPage,
      this.itemsPerPage,
      this.idCustomerFilter,
      this.minBalanceFilter,
      this.maxBalanceFilter
    ).subscribe(
      (data) => {
        this.creditAccounts = data.result.data;
        this.totalItems = data.result.total;
      },
      (error) => {
        console.error('Error fetching credit accounts:', error);
      }
    );
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.fetchCreditAccounts();
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchCreditAccounts();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchCreditAccounts();
    }
  }

  deleteCreditAccount(id: number): void {
    if (confirm('Are you sure you want to delete this credit account?')) {
      this.creditAccountService.deleteCreditAccount(id).subscribe(() => {
        this.fetchCreditAccounts();
      });
    }
  }

  updateItemsPerPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1;
    this.fetchCreditAccounts();
  }

  createCreditAccount(): void {
    this.router.navigate(['/credit-accounts/create']);
  }

  editCreditAccount(id: number): void {
    this.router.navigate(['/credit-accounts/update', id]);
  }
}
