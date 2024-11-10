import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/api/product.service';
import { Product } from '../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    created_at: ''
  };

  constructor(
    public router: Router,  // Cambiado a public
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response) => {
        this.product = response.result;
      },
      (error: any) => {
        console.error('Error loading product:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        () => {
          console.log('Product updated successfully');
          this.router.navigate(['/products']);
        },
        (error: any) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }
}
