import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/api/order.service';
import { Order } from '../../../../core/models/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  statusFilter?: string;
  customerFilter?: number;
  showFilters: boolean = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.fetchOrders();
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  resetFilters(): void {
    this.statusFilter = undefined;
    this.customerFilter = undefined;
    this.currentPage = 1;
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrders(
      this.currentPage,
      this.itemsPerPage,
      this.statusFilter,
      this.customerFilter
    ).subscribe(
      (data) => {
        this.orders = data.result.data;
        this.totalItems = data.result.total;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.fetchOrders();
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchOrders();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchOrders();
    }
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.fetchOrders();
      });
    }
  }

  updateItemsPerPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1;
    this.fetchOrders();
  }

  createOrder(): void {
    this.router.navigate(['/orders/create']);
  }

  editOrder(id: number): void {
    this.router.navigate(['/orders/update', id]);
  }

  markAsCompleted(order: Order): void {
    // Verifica si el estado ya está completado
    if (order.status === 'Completada') {
      Swal.fire('La orden ya está completada.');
      return;
    }

    // Cambia el estado de la orden a 'Completada'
    const updatedOrder = { ...order, status: 'Completada' };
    this.orderService.updateOrder(order.id, updatedOrder).subscribe(
      () => {
        order.status = 'Completada';
        Swal.fire({
          icon: 'success',
          title: 'Venta Realizada',
          text: 'La orden ha sido marcada como completada.',
          confirmButtonColor: '#3085d6',
        });
      },
      (error) => {
        console.error('Error updating order:', error);
        Swal.fire('Error', 'Hubo un error al actualizar el estado de la orden.', 'error');
      }
    );
  }
}
