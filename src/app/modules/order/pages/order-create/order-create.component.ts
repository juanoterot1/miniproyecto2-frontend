import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../../core/services/api/order.service';
import { ProductService } from '../../../../core/services/api/product.service';
import { Order } from '../../../../core/models/order.model';
import { OrderItem } from '../../../../core/models/order-item.model';
import { Product } from '../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OrderCreateComponent implements OnInit {
  paymentMethods: string[] = ['Tarjeta de crédito', 'Débito', 'Efectivo', 'Transferencia bancaria'];
  paymentMethod: string = '';
  idCustomer: number = 0;
  deliveryDate?: string;
  status: string = 'Pendiente';
  orderItems: OrderItem[] = [];
  products: Product[] = [];
  selectedProducts: { product: Product; quantity: number; totalPrice: number }[] = [];
  newOrderItem: OrderItem = {
    id: 0,
    quantity: 1,
    price: 0,
    id_order: 0,
    id_product: 0
  };

  constructor(
    public router: Router,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.result.data;
    });
  }

  onProductSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const productId = Number(selectElement.value);
    this.newOrderItem.id_product = productId;
  }

  addOrderItem(): void {
    const product = this.products.find(p => p.id === this.newOrderItem.id_product);
    if (product && this.newOrderItem.quantity > 0) {
      this.newOrderItem.price = product.price;
      this.orderItems.push({ ...this.newOrderItem });
      this.selectedProducts.push({
        product: product,
        quantity: this.newOrderItem.quantity,
        totalPrice: product.price * this.newOrderItem.quantity,
      });
      this.newOrderItem = { id: 0, quantity: 1, price: 0, id_order: 0, id_product: 0 };
    } else {
      alert("Por favor, seleccione un producto y una cantidad válida.");
    }
  }

  removeOrderItem(index: number): void {
    this.orderItems.splice(index, 1);
    this.selectedProducts.splice(index, 1);
  }

  createOrder(): void {
    const newOrder: Order = {
      id: 0,
      order_date: new Date().toISOString(),
      delivery_date: this.deliveryDate,
      status: this.status,
      payment_method: this.paymentMethod,
      id_customer: this.idCustomer,
      order_items: this.orderItems
    };

    this.orderService.createOrder(newOrder).subscribe(
      (response) => {
        this.router.navigate(['/orders']);
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }
}
