import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { AdminService } from '../../Service/admin.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orderDetails: any = [];
  isOrderIsEmpty: boolean = false;
  notDelivered: boolean = true
  isLoading: boolean = false;
  constructor(private productService: ProductService, private adminService: AdminService) { }

  status: string = "all"
  ngOnInit(): void {
    this.getOrderDetails(this.status)
  }


  getOrderDetails(status: any) {
    this.isLoading = true
    this.productService.getAllOrderDetails(status).subscribe(
      response => {
        this.isLoading = false;
        this.orderDetails = response;

        if (this.orderDetails.length == 0) {
          this.isOrderIsEmpty = true
        }
        else {
          this.isOrderIsEmpty = false
        }
      },
      error => {
        this.isLoading = false
        console.log(error);
      }
    );
  }

  orderIsDelivered(id: any): boolean {
    let isDelivered = false;

    this.orderDetails.forEach((order: any) => {
      if (order.orderId === id) {
        if (order.orderStatus === 'Delivered') {
          isDelivered = true

        };
      }
    });

    return isDelivered;
  }

  markAsDeliverd(id: any) {
    this.productService.markOrderAsDelivered(id).subscribe(
      response => {
        this.getOrderDetails("Placed")
        this.notDelivered = false
      }
      ,
      error => {
        console.log(error);

      }
    )
  }
}
