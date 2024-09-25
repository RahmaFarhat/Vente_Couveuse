import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  setRoles(roles: []) {
    if (typeof window !== 'undefined') { // Check if `window` is defined
      localStorage.setItem("roles", JSON.stringify(roles));
    } //because array of roles is not assign to the local storage so that' why we convet it to it to string
  }

  getRoles(): any[] {
    let roles

    if (typeof window !== 'undefined') {
      roles = localStorage.getItem('roles');
    }
    if (roles) {
      return JSON.parse(roles)
    }
    return []
  }

  setBasicAuthString(basicauth: string) {
    localStorage.setItem("basicAuth", basicauth)
  }

  setUserName(name: string) {
    localStorage.setItem("name", name);
  }

  getUserName() {
    return localStorage.getItem('name')
  }

  setUserEmail(email: string) {
    localStorage.setItem("email", email);
  }

  getUserEmail() {
    return localStorage.getItem('email')
  }

  getBasicAuthString() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("basicAuth")
    }
    return null;
  }

  clearLocalStorage() {
    localStorage.clear()
  }

  isLoggedIn() {
    if (this.getRoles() && this.getBasicAuthString()) {
      return true
    }
    return false
  }

  private orderPlaced = new BehaviorSubject<boolean>(false);

  constructor() { }

  setOrderPlaced(status: boolean) {
    this.orderPlaced.next(status);
  }

  isOrderPlaced(): boolean {
    return this.orderPlaced.value;
  }
}
