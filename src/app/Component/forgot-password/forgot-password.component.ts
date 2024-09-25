import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../Service/user-auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  verificationError: any;
  loading: boolean = false;
  displayPassword: boolean = false
  constructor(private userservice: UserService, private router: Router, private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.email = this.userAuthService.getUserEmail()
    }
  }
  email: any;
  otp: any;

  user: any = {
    email: '',
    pasword: ''
  }

  verifyOtp() {
    // console.log(this.email);

    this.loading = true
    this.userservice.verifyOtp(this.email, this.otp).subscribe(response => {
      if (response == true) {
        this.loading = false
        this.verificationError = false

        this.displayPassword = true

      }
      else {
        this.verificationError = true;
        this.loading = false
      }

    },
      error => {
        this.loading = false
        console.log(error);
      }
    )
  }
  newPassword: string = ""

  updatePassword() {
    this.user.email = this.email;
    this.user.pasword = this.newPassword;

    this.userservice.updatePassword(this.user).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Password Changed',
          text: 'Your password has been successfully updated.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating your password. Please try again',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
        console.log(error);
      }
    );
  }
}
