import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../core/services/api/customer.service';
import { Customer } from '../../../../core/models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  fullNameFilter?: string;
  emailFilter?: string;
  showFilters: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.fetchCustomers();
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  resetFilters(): void {
    this.fullNameFilter = undefined;
    this.emailFilter = undefined;
    this.currentPage = 1;
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.customerService.getCustomers(
      this.currentPage,
      this.itemsPerPage,
      this.fullNameFilter,
      this.emailFilter
    ).subscribe(
      (data) => {
        this.customers = data.result.data;
        this.totalItems = data.result.total;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.fetchCustomers();
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchCustomers();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchCustomers();
    }
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.fetchCustomers();
      });
    }
  }

  updateItemsPerPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1;
    this.fetchCustomers();
  }

  createCustomer(): void {
    this.router.navigate(['/customers/create']);
  }

  editCustomer(id: number): void {
    this.router.navigate(['/customers/update', id]);
  }
}
