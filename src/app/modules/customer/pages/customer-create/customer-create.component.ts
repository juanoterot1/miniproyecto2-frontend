import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../core/services/api/customer.service';
import { Customer } from '../../../../core/models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CustomerCreateComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  creditLimit: number = 0;

  constructor(
    public router: Router, // Cambiado a public
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {}

  createCustomer(): void {
    const newCustomer: Customer = {
      id: 0, // o asignar un valor temporal si es necesario
      full_name: this.fullName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      credit_limit: this.creditLimit,
      created_at: new Date().toISOString()
    };

    this.customerService.createCustomer(newCustomer).subscribe(
      (response) => {
        console.log('Customer created successfully:', response);
        this.router.navigate(['/customers']);
      },
      (error) => {
        console.error('Error creating customer:', error);
      }
    );
  }
}
