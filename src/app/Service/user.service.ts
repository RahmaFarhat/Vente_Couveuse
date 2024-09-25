import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interface/user';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // baseUrl: String = "https://buyfurnbackend-xzhj.onrender.com/api"
  // baseUrl: String = "http://buyfurn.ap-south-1.elasticbeanstalk.com/api"
 // baseUrl: String = "https://buyfurnbackend.site/api"

  baseUrl: String = "http://localhost:8090/api"
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  login(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/login`);
  }

  roleMatch(allowroles: any[]): boolean {

    let isMatch = false;
    const userRoles: any[] = this.userAuthService.getRoles();

    if (userRoles != null && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowroles.length; j++) {
          if (userRoles[i] === allowroles[j]) {
            isMatch = true;
            return isMatch;
          }
          else {
            return isMatch
          }
        }
      }
    }

    return isMatch;
  }


  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }

  generateOtp(email: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/generate-otp`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/verify-otp`, { email, otp });
  }

  delteMyAccont(): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/user/delete`)
  }

  findByEmail(email: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/user/getByEmail/${email}`)
  }

  updatePassword(user: any) {
    return this.httpClient.post(`${this.baseUrl}/updatepassword`, user)
  }
  updateUser(user: any, img?: File): Observable<any> {
    // debugger
    if (img) {
      const formData: FormData = new FormData();
      formData.append('user', JSON.stringify(user));
      formData.append('img', img, img.name);
      return this.httpClient.post(`${this.baseUrl}/user/updateuser`, formData)
    }
    else {
      const formData: FormData = new FormData();
      formData.append('user', JSON.stringify(user));
      return this.httpClient.post(`${this.baseUrl}/user/updateuser`, formData)
    }

  }

}
