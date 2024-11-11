import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../../../core/services/api/inventory.service';
import { ProductService } from '../../../../core/services/api/product.service';
import { Inventory } from '../../../../core/models/inventory.model';
import { Product } from '../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-create.component.html'
})
export class InventoryCreateComponent implements OnInit {
  inventory: Inventory = { id: 0, product_id: 0, stock_quantity: 0 };
  products: Product[] = [];

  constructor(public router: Router, private inventoryService: InventoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.result.data; // Ajuste aquí basado en la estructura de ApiResponse
        console.log('Productos cargados:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  createInventory(): void {
    this.inventoryService.createInventoryItem(this.inventory).subscribe(
      () => {
        console.log('Inventory item created successfully');
        this.router.navigate(['/inventory']);
      },
      (error) => {
        console.error('Error creating inventory item:', error);
      }
    );
  }
}
