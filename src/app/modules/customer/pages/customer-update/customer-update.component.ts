import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../../core/services/api/customer.service';
import { Customer } from '../../../../core/models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CustomerUpdateComponent implements OnInit {
  customerId: number | null = null;
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  creditLimit: number = 0;

  constructor(
    public router: Router, // Cambiado a public
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.customerId) {
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(id: number): void {
    this.customerService.getCustomerById(id).subscribe(
      (response) => {
        const customer = response.result;
        if (customer) {
          this.fullName = customer.full_name;
          this.email = customer.email;
          this.phone = customer.phone;
          this.address = customer.address || '';
          this.creditLimit = customer.credit_limit;
        }
      },
      (error) => {
        console.error('Error loading customer:', error);
      }
    );
  }

  updateCustomer(): void {
    if (this.customerId) {
      const updatedCustomer: Customer = {
        id: this.customerId,
        full_name: this.fullName,
        email: this.email,
        phone: this.phone,
        address: this.address,
        credit_limit: this.creditLimit,
        created_at: new Date().toISOString() // O el valor original si está disponible
      };

      this.customerService.updateCustomer(this.customerId, updatedCustomer).subscribe(
        () => {
          console.log('Customer updated successfully');
          this.router.navigate(['/customers']);
        },
        (error) => {
          console.error('Error updating customer:', error);
        }
      );
    }
  }
}
