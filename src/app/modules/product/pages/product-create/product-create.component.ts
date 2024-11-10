import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/api/product.service';
import { Product } from '../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent implements OnInit {
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
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  createProduct(): void {
    this.productService.createProduct(this.product).subscribe(
      () => {
        console.log('Product created successfully');
        this.router.navigate(['/products']);
      },
      (error: any) => {
        console.error('Error creating product:', error);
      }
    );
  }
}
