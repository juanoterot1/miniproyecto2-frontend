import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../core/services/api/order.service';
import { CustomerService } from '../../../../core/services/api/customer.service';
import { Order } from '../../../../core/models/order.model';
import { Customer } from '../../../../core/models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-update.component.html',
})
export class OrderUpdateComponent implements OnInit {
  order: Order = {
    id: 0,
    order_date: '',
    delivery_date: '',
    status: '',
    payment_method: '',
    id_customer: 0,
    order_items: []
  };

  customers: Customer[] = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (orderId) {
      this.loadOrder(orderId);
      this.loadCustomers();
    }
  }

  loadOrder(id: number): void {
    this.orderService.getOrderById(id).subscribe(
      (response) => {
        this.order = response.result;
      },
      (error: any) => {
        console.error('Error loading order:', error);
      }
    );
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data) => {
        this.customers = data.result.data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  updateOrder(): void {
    if (this.order.id) {
      this.orderService.updateOrder(this.order.id, this.order).subscribe(
        () => {
          console.log('Order updated successfully');
          this.router.navigate(['/orders']);
        },
        (error: any) => {
          console.error('Error updating order:', error);
        }
      );
    }
  }
}
