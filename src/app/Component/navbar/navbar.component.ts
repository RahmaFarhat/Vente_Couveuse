import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Service/user.service';
import { UserAuthService } from '../../Service/user-auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private router: Router, private userAuthService: UserAuthService) { }

  loggedIn = this.userAuthService.isLoggedIn()

  logOut() {
    this.userAuthService.clearLocalStorage()

  }
  navigateToProfileOrLogin(): void {
    const isLoggedIn = this.userAuthService.isLoggedIn();
    if (isLoggedIn) {
      if (this.userAuthService.getRoles().includes("ADMIN")) {
        this.router.navigate(['/admin']);
      }
      else if (this.userAuthService.getRoles().includes("USER")) {
        this.router.navigate(['/userdashbord'])
      }
    }
    else {
      this.router.navigate(['/login'])

    }

  }

  navigateToCartOrLogin() {


    const isLoggedIn = this.userAuthService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/cart'])
    } else {
      this.router.navigate(['/login'])
    }
  }
}

