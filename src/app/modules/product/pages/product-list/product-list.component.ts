import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/api/product.service';
import { Product } from '../../../../core/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  showFilters: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.fetchProducts();
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  fetchProducts(): void {
    this.productService.getProducts(
      this.currentPage,
      this.itemsPerPage
    ).subscribe(
      (data) => {
        this.products = data.result.data;
        this.totalItems = data.result.total;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.fetchProducts();
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchProducts();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.fetchProducts();
      });
    }
  }

  updateItemsPerPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1;
    this.fetchProducts();
  }

  createProduct(): void {
    this.router.navigate(['/products/create']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/update', id]);
  }
}
