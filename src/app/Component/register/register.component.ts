import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Service/user.service';
import { User } from '../../Interface/user';
import { response } from 'express';
import { error, log } from 'console';
import { EmailService } from '../../Service/email.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // routerLink="/otp"

  EmailRequest: any = {
    to: '',
    subject: '',
    text: ''
  }

  user: User = {
    name: '',
    email: '',
    pasword: '',
  }

  loding: boolean = false;

  constructor(private userSerive: UserService, private route: Router, private emailService: EmailService) {

  }
  registrationError: any;
  emailIdExits: any;
  generateOtp() {
    this.loding = true;
    this.userSerive.generateOtp(this.user.email).subscribe(response => {
      this.loding = false;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("email", this.user.email.trim())
        localStorage.setItem("name", this.user.name)
        localStorage.setItem("pasword", this.user.pasword)
        this.EmailRequest.to = this.user.email.trim();
        this.EmailRequest.subject = "OTP for varify your email";
        this.EmailRequest.text = response;

        this.emailService.sendMail(this.EmailRequest).subscribe(mailResponse => {

        });

        this.route.navigate(['/verify-otp']);

      }

    },
      error => {
        if (error.status == 302) {
          this.emailIdExits = true;
          this.loding = false;
        }
        else {
          this.loding = false;

          this.registrationError = true;
        }
      }
    );
  }
}
