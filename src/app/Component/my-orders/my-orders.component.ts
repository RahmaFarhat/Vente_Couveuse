import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  orderDetails: any = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.myOrders()
  }

  myOrders() {
    this.productService.myOrders().subscribe(
      response => {
        this.orderDetails = response;
      },
      error => {
        console.log(error);
      }
    )
  }
}
