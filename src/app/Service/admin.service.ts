import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

   baseUrl: String = "http://localhost:8090/api"
  // http://buyfurn.ap-south-1.elasticbeanstalk.com/swagger-ui/index.html
  // baseUrl: String = "http://buyfurn.ap-south-1.elasticbeanstalk.com/api"
 // baseUrl: String = "https://buyfurnbackend.site/api"


  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getall`);
  }

  getAllProducts(pageNumber: number, searchKey: string, category: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/admin/getAllProductsForAdmin?pageNumber=${pageNumber}&searchKey=${searchKey}&searchCategory=${category}`);
  }
}
