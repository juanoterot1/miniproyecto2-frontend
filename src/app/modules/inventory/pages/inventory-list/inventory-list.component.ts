import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../core/services/api/inventory.service';
import { Inventory } from '../../../../core/models/inventory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-list.component.html',
})
export class InventoryListComponent implements OnInit {
  inventoryItems: Inventory[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  productIdFilter?: number;
  minStockFilter?: number;
  maxStockFilter?: number;
  showFilters: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.fetchInventoryItems();
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  resetFilters(): void {
    this.productIdFilter = undefined;
    this.minStockFilter = undefined;
    this.maxStockFilter = undefined;
    this.currentPage = 1;
    this.fetchInventoryItems();
  }

  fetchInventoryItems(): void {
    this.inventoryService.getInventoryItems(
      this.currentPage,
      this.itemsPerPage,
      this.productIdFilter,
      this.minStockFilter,
      this.maxStockFilter
    ).subscribe(
      (data) => {
        this.inventoryItems = data.result.data;
        this.totalItems = data.result.total;
      },
      (error) => {
        console.error('Error fetching inventory items:', error);
      }
    );
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.fetchInventoryItems();
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchInventoryItems();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchInventoryItems();
    }
  }

  deleteInventoryItem(id: number): void {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      this.inventoryService.deleteInventoryItem(id).subscribe(() => {
        this.fetchInventoryItems();
      });
    }
  }

  createInventoryItem(): void {
    this.router.navigate(['/inventory/create']);
  }

  updateInventoryItem(id: number): void {
    this.router.navigate(['/inventory/update', id]);
  }
}
