import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../Service/user-auth.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgIf, RouterLink, LoadingComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  hasProfile: boolean = false;
  decodeString: any;
  firstPosition: string | null = null;
  user: any = {
    name: '',
    email: '',
    contactNumber: '',
    address: {
      address: '',
      pincode: '',
      state: ''
    },
  };

  constructor(private userService: UserService, private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData() {
    this.userService.login().subscribe(
      response => {
        this.user = response || {};  // Ensure user is not null
        this.user.address = this.user.address || { address: '', pincode: '', state: '' };  // Ensure address is not null
        this.hasProfile = this.user.userImage && this.user.userImage !== "null";
        localStorage.setItem("username", this.user.email);
      },
      error => {
        console.log(error);
      }
    );
  }

  logout() {
    this.userAuthService.clearLocalStorage()
    this.router.navigate(['/']);
  }

  deleteMyAccount() {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delteMyAccont().subscribe(
          response => {
            Swal.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success"
            }).then(() => {
              this.logout();
              this.router.navigate(['/']);
            });
            // window.location.reload()
          },
          error => {
            // console.error(error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting your account. Please try again!",
              icon: "error"
            });

          }
        );
      }
    });
  }
}
