import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { response } from 'express';
import { error } from 'console';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, LoadingComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  isLoading: boolean = true;
  products: any = [];
  isNoProducts: boolean = false;
  constructor(private productService: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response) => {
        this.isLoading = false;
        this.products = response;

        if (this.products.length === 0) {
          this.isNoProducts = true;
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching cart details:', error);
      }
    );
  }

  checkOut() {

    this.router.navigate(['/buyproduct'], {
      queryParams: {
        isSingleProductCheckout: false,
        id: 0
      }
    })
  }

  removeProduct(id: any) {
    this.productService.removeCartProduct(id).subscribe(
      response => {
        this.getCartDetails();
        Swal.fire("Product removed");

      },
      error => {
        console.log(error);
      }
    );
  }

}
