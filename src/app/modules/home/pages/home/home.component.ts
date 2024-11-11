import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../../../core/services/api/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  totalOrders!: string;
  totalCompletedOrders!: string;
  totalPendingOrders!: string;
  topCustomers!: { customer_name: string; completed_order_count: number }[];
  topSellingProducts!: { product_name: string; total_quantity_sold: number }[];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadTotalOrders();
    this.loadTotalCompletedOrders();
    this.loadTotalPendingOrders();
    this.loadTopCustomers();
    this.loadTopSellingProducts();
  }

  loadTotalOrders(): void {
    this.homeService.getTotalOrders().subscribe(
      (response: string) => {
        this.totalOrders = response;
      },
      (error: any) => {
        console.error('Error al cargar total de órdenes:', error);
      }
    );
  }

  loadTotalCompletedOrders(): void {
    this.homeService.getTotalCompletedOrders().subscribe(
      (response: string) => {
        this.totalCompletedOrders = response;
      },
      (error: any) => {
        console.error('Error al cargar órdenes completadas:', error);
      }
    );
  }

  loadTotalPendingOrders(): void {
    this.homeService.getTotalPendingOrders().subscribe(
      (response: string) => {
        this.totalPendingOrders = response;
      },
      (error: any) => {
        console.error('Error al cargar órdenes pendientes:', error);
      }
    );
  }

  loadTopCustomers(): void {
    this.homeService.getTopCustomers().subscribe(
      (response: { customer_name: string; completed_order_count: number }[]) => {
        this.topCustomers = response;
      },
      (error: any) => {
        console.error('Error al cargar los principales clientes:', error);
      }
    );
  }

  loadTopSellingProducts(): void {
    this.homeService.getTopSellingProducts().subscribe(
      (response: { product_name: string; total_quantity_sold: number }[]) => {
        this.topSellingProducts = response;
      },
      (error: any) => {
        console.error('Error al cargar los productos más vendidos:', error);
      }
    );
  }
}
