import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  user: any = {
    name: '',
    email: '',
    address: {
      address: '',
      pincode: '',
      city: '',
      state: ''
    },
    contactNumber: ''
  };

  newAddress: any = {
    address: '',
    pincode: '',
    city: '',
    state: ''
  };

  onSubmit() {
    if (this.selectedFile) {
      if (this.user && this.user.email) {
        // console.log(this.user);

        this.userService.updateUser(this.user, this.selectedFile).subscribe(
          response => {
            Swal.fire("Your information updated!")
            this.router.navigate(['/userprofile']);
          },
          error => {
            console.log(error);

          }
        )
      }


    }
    else {
      // console.log(this.user);
      this.user.address = this.newAddress;
      if (this.user && this.user.email) {

        this.userService.updateUser(this.user).subscribe(
          response => {
            Swal.fire("Your information is updated")
            this.router.navigate(['/userprofile']);
          },
          error => {
            console.log(error);

          }
        )
      }
    }


  }




  selectedFile: File | null = null;

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  ngOnInit(): void {
    this.findByEmail();
  }

  findByEmail() {
    const username = localStorage.getItem('email');
    if (username) {
      this.userService.findByEmail(username).subscribe(
        response => {
          this.user = response || {};

        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('Username is null or undefined');
    }
  }

}
