import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { error, log } from 'console';
import { Product } from '../../Interface/product';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-latestproduct',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, LoadingComponent],
  templateUrl: './latestproduct.component.html',
  styleUrl: './latestproduct.component.css'
})
export class LatestproductComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getLatestProduct()
  }
  products: Product[] = [];
  isEmpty: boolean = false

  getLatestProduct() {
    this.isLoading = true;
    this.productService.getLetestProducts().subscribe(data => {
      this.isLoading = false;

      this.products = data;
      if (this.products.length === 0) {
        this.isEmpty = true
      }
      else {
        this.isEmpty = false
      }
    }, error => {
      console.log(error);
      this.isLoading = false;
    }
    )
  }
}
