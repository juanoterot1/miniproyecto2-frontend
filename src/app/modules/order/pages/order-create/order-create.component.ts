import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../../core/services/api/order.service';
import { ProductService } from '../../../../core/services/api/product.service';
import { CustomerService } from '../../../../core/services/api/customer.service';
import { Order } from '../../../../core/models/order.model';
import { OrderItem } from '../../../../core/models/order-item.model';
import { Product } from '../../../../core/models/product.model';
import { Customer } from '../../../../core/models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
  customers: Customer[] = []; // Lista de clientes
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
    private productService: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.result.data;
    });

    // Cargar clientes disponibles
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.result.data;
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
    if (!this.idCustomer || !this.paymentMethod) {
      alert("Por favor, asegúrese de que el método de pago y el cliente estén seleccionados correctamente.");
      return;
    }

    const formattedOrderItems = this.orderItems.map(item => ({
      quantity: item.quantity,
      price: item.price,
      id_product: item.id_product
    }));

    const newOrder: Order = {
      id: 0,
      order_date: new Date().toISOString(),
      delivery_date: this.deliveryDate || new Date().toISOString(),
      status: this.status,
      payment_method: this.paymentMethod,
      id_customer: this.idCustomer,
      order_items: formattedOrderItems as unknown as OrderItem[]
    };

    this.orderService.createOrder(newOrder).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Orden Creada',
          text: 'La orden ha sido creada exitosamente.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          this.router.navigate(['/orders']);
        });
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }
}
