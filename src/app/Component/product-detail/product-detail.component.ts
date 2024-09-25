import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { response } from 'express';
import { error } from 'console';
import { UserAuthService } from '../../Service/user-auth.service';
import { LoadingComponent } from '../loading/loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product: any;
  productId: string | null = null;
  currentSlide: number = 0;
  quantity: number = 1;
  isLoading = true;
  productNotAvailable: boolean = false
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private authService: UserAuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe(
          response => {
            this.product = response;
            this.isLoading = false;
          },
          error => {
            // console.error('Error fetching product:', error);

            this.isLoading = false;
            if (error.status === 500) {
              this.productNotAvailable = true
            }
            else {
              Swal.fire({
                title: "Try agian!"
              }
              )
              this.router.navigate(['/furniture'])
            }
          }
        );
      }
    });
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.product.productImages.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.product.productImages.length) % this.product.productImages.length;
  }

  addToCart(cartId: any) {
    const roles = this.authService.getRoles();

    if (roles.includes("ADMIN")) {
      this.router.navigate(['/forbidden']);
    }
    else {
      const isLoggedIn = this.authService.isLoggedIn()
      if (isLoggedIn) {
        this.productService.addToCart(cartId, this.quantity).subscribe(
          (response) => {
            Swal.fire("Product added to your cart!")
          },
          (error) => {
            console.log(error);

          }
        )
      }
      else {
        this.router.navigate(['/login'])
      }
    }
  }

  buyNow(productId: any) {
    if (this.product.stockStatus === "In Stock") {
      this.router.navigate(['/buyproduct'], {
        queryParams: {
          isSingleProductCheckout: true,
          id: productId
        }
      })
    }
    else if (this.product.stockStatus == "Out of Stock" || this.product.stockStatus == "In Stock soon") {
      Swal.fire({
        title: "Out of Stock",
        text: "This product is not in stock at the moment.",
        icon: "warning",
        confirmButtonText: "OK"
      });

    }
    else {
      Swal.fire({
        title: "Try again later",
        icon: "error",
        confirmButtonText: "OK"
      });

    }
  }
}
