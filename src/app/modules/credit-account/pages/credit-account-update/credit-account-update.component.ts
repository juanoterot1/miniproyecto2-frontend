import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditAccountService } from '../../../../core/services/api/credit-account.service';
import { CustomerService } from '../../../../core/services/api/customer.service';
import { CreditAccount } from '../../../../core/models/credit-account.model';
import { Customer } from '../../../../core/models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-credit-account-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-account-update.component.html',
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
export class CreditAccountUpdateComponent implements OnInit {
  creditAccountId: number | null = null;
  creditAccount: CreditAccount | null = null;
  customers: Customer[] = [];
  selectedCustomerId: number | null = null;
  creditBalance: number | null = null;
  dueDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private creditAccountService: CreditAccountService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.creditAccountId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.creditAccountId) {
      this.loadCreditAccount(this.creditAccountId);
    }
    this.loadCustomers();
  }

  loadCreditAccount(id: number): void {
    this.creditAccountService.getCreditAccountById(id).subscribe(
      (response) => {
        this.creditAccount = response.result;
        if (this.creditAccount) {
          this.selectedCustomerId = this.creditAccount.id_customer;
          this.creditBalance = this.creditAccount.credit_balance;
          this.dueDate = this.creditAccount.due_date;
        }
      },
      (error: any) => {
        console.error('Error loading credit account:', error);
      }
    );
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (response) => {
        this.customers = response.result.data;
      },
      (error: any) => {
        console.error('Error loading customers:', error);
      }
    );
  }

  updateCreditAccount(): void {
    if (this.creditAccountId && this.selectedCustomerId && this.creditBalance !== null) {
      this.creditAccountService
        .updateCreditAccount(this.creditAccountId, this.creditBalance, this.dueDate, this.selectedCustomerId)
        .subscribe(
          () => {
            console.log('Credit account updated successfully');
            this.router.navigate(['/credit-accounts']);
          },
          (error: any) => {
            console.error('Error updating credit account:', error);
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['/credit-accounts']);
  }
}
