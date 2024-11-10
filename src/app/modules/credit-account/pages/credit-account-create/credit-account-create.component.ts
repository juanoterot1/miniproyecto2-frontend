import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CreditAccountService } from '../../../../core/services/api/credit-account.service';
import { CustomerService } from '../../../../core/services/api/customer.service';
import { Customer } from '../../../../core/models/customer.model';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../../core/models/api-response.model';

@Component({
  selector: 'app-credit-account-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-account-create.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class CreditAccountCreateComponent implements OnInit {
  customers: Customer[] = [];
  creditBalance: number = 0;
  dueDate: string = '';
  selectedCustomerId: number | null = null;

  constructor(
    private creditAccountService: CreditAccountService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (response: ApiResponse<{ data: Customer[] }>) => {
        this.customers = response.result.data;
      },
      (error: any) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  createCreditAccount(): void {
    if (this.selectedCustomerId && this.creditBalance && this.dueDate) {
      this.creditAccountService.createCreditAccount(
        this.creditBalance,
        this.dueDate,
        this.selectedCustomerId
      ).subscribe(
        (response) => {
          console.log('Credit account created successfully:', response);
          this.router.navigate(['/credit-accounts']);
        },
        (error) => {
          console.error('Error creating credit account:', error);
        }
      );
    }
  }
}
