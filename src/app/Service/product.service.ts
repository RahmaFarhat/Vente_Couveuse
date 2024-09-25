import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Interface/product';
import { OrderDetails } from '../Interface/orderdetails';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // baseUrl1: String = "https://buyfurnbackend-xzhj.onrender.com/api"
  // baseUrl: String = "https://buyfurnbackend-xzhj.onrender.com/api/admin"

  //baseUrl1: String = "https://buyfurnbackend.site/api"
  //baseUrl: String = "https://buyfurnbackend.site/api/admin"

  // baseUrl1: String = "http://buyfurn.ap-south-1.elasticbeanstalk.com/api"
  // baseUrl: String = "http://buyfurn.ap-south-1.elasticbeanstalk.com/api/admin"


   baseUrl1: String = "http://localhost:8090/api"
  baseUrl: String = "http://localhost:8090/api/admin"

  constructor(private httpclient: HttpClient) { }

  addProduct(product: any, images: File[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('product', JSON.stringify(product));

    images.forEach((image) => {
      formData.append('imgs', image, image.name);
    });

    return this.httpclient.post(`${this.baseUrl}/addproduct`, formData);
  }

  getAllProducts(pageNumber: number, searchKey: string, category: string): Observable<any> {
    return this.httpclient.get(`${this.baseUrl1}/getallproducts?pageNumber=${pageNumber}&searchKey=${searchKey}&searchCategory=${category}`);
  }
  getLetestProducts(): Observable<any> {
    return this.httpclient.get(`${this.baseUrl1}/latest`);
  }

  getProductById(id: any): Observable<any> {
    return this.httpclient.get(`${this.baseUrl1}/getbyid/${id}`)
  }

  deleteProductById(id: any): Observable<any> {
    return this.httpclient.delete(`${this.baseUrl}/deletebyid/${id}`)
  }

  updateProduct(product: any, images: File[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('product', JSON.stringify(product));

    images.forEach((image) => {
      formData.append('img', image, image.name);
    }); return this.httpclient.post(`${this.baseUrl}/updateproduct`, formData)
  }

  placeOrder(orderDetails: OrderDetails, isCartCheckout: boolean) {
    // console.log(isCartCheckout);

    return this.httpclient.post(`${this.baseUrl1}/user/placeOrder/${isCartCheckout}`, orderDetails)
  }

  addToCart(productId: any, quantity: any) {

    return this.httpclient.get(`${this.baseUrl1}/user/addToCart/${productId}/${quantity}`)
  }

  getCartDetails() {
    return this.httpclient.get(`${this.baseUrl1}/user/getCartDetails`)
  }

  getProductDetails(isSinbleProductCheckout: any, productId: any) {
    return this.httpclient.get<Product[]>(`${this.baseUrl1}/user/getproductdetails/${isSinbleProductCheckout}/${productId}`)
  }

  removeCartProduct(id: any) {
    return this.httpclient.delete(`${this.baseUrl1}/user/deleteCartProduct/${id}`);
  }


  getAllOrderDetails(status: any) {
    return this.httpclient.get(`${this.baseUrl}/allOrders/${status}`)
  }


  markOrderAsDelivered(id: any) {
    return this.httpclient.put(`${this.baseUrl}/markAsDelivered/${id}`, id)
  }


  myOrders() {
    return this.httpclient.get(`${this.baseUrl1}/user/myOrders`)
  }

  createTransaction(amount: number) {
    return this.httpclient.get(`${this.baseUrl1}/user/createTransaction/${amount}`)
  }
}
