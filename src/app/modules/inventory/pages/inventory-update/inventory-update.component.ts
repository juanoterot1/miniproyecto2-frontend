import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../../core/services/api/inventory.service';
import { ProductService } from '../../../../core/services/api/product.service';
import { Inventory } from '../../../../core/models/inventory.model';
import { Product } from '../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-update.component.html'
})
export class InventoryUpdateComponent implements OnInit {
  inventory: Inventory = { id: 0, product_id: 0, stock_quantity: 0 };
  products: Product[] = [];
  inventoryId: number = 0;

  constructor(public router: Router, private route: ActivatedRoute, private inventoryService: InventoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.inventoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadInventory();
    this.loadProducts();
  }

  loadInventory(): void {
    this.inventoryService.getInventoryItemById(this.inventoryId).subscribe(
      (response) => {
        this.inventory = response.result;
      },
      (error) => {
        console.error('Error loading inventory item:', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.result.data;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  updateInventory(): void {
    this.inventoryService.updateInventoryItem(this.inventoryId, this.inventory).subscribe(
      () => {
        console.log('Inventory item updated successfully');
        this.router.navigate(['/inventory']);
      },
      (error) => {
        console.error('Error updating inventory item:', error);
      }
    );
  }
}
