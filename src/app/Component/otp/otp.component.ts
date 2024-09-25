import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { response } from 'express';
import { error } from 'console';
import { User } from '../../Interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {
  verificationError: any;
  loading: boolean = false;

  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.email = localStorage.getItem("email");
    }
  }
  email: any;
  otp: any;

  user: any = {
    name: '',
    email: '',
    pasword: ''
  }

  verifyOtp() {
    this.loading = true
    this.userservice.verifyOtp(this.email, this.otp).subscribe(response => {
      if (response == true) {
        this.loading = false
        if (typeof localStorage !== 'undefined') {
          this.user.email = localStorage.getItem("email")
          this.user.name = localStorage.getItem("name")
          this.user.pasword = localStorage.getItem("pasword")
          this.userservice.register(this.user).subscribe(response => {
            if (response) {
              localStorage.clear()
              this.router.navigate(['/login']);
            }

          }, error => {
            console.log(error);
            this.loading = false

          })

        }
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

}
