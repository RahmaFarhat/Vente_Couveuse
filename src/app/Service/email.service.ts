import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  // baseUrl: String = "https://buyfurnbackend-xzhj.onrender.com/api"
  // baseUrl: String = "http://buyfurn.ap-south-1.elasticbeanstalk.com/api"
  baseUrl: String = "https://buyfurnbackend.site/api"


  sendMail(email: EmailService) {
    return this.httpClient.post(`${this.baseUrl}/send-email`, email)
  }
}
