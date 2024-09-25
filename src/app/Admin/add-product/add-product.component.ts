import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ProductService } from '../../Service/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  categories: string[] = ['Couveuse 12', 'Couveuse 24', 'Couveuse 32', 'Couveuse 48', 'Couveuse 64', 'Couveuse 128'];
  stockOptions: string[] = ['In Stock', 'In Stock soon', 'Out of Stock']
  product: any = {
    title: '',
    description: '',
    price: null,
    warranty: '',
    category: '',
    color: '',
    material: '',
    seatingCapacity: null,
    weight: null,
    careAndMaintenance: '',
    stockStatus: '',
  };
  selectedFiles: File[] = [];

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files); // Convert FileList to Array

  }

  constructor(private productService: ProductService, private router: Router) { }

  onSubmit() {
    // console.log(typeof (this.product.stockStatus), this.product.stockStatus);

    this.productService.addProduct(this.product, this.selectedFiles)
      .subscribe(response => {
        Swal.fire("Product added!");
        this.resetForm();
        this.router.navigateByUrl('/admin/product')
      }, error => {
        Swal.fire('Error adding product. Try again..');
      });
  }


  resetForm() {
    const fileInput: HTMLInputElement = document.getElementById('productImages') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear the value of the file input
    }
    this.selectedFiles = [];
    this.product = {
      title: '',
      description: '',
      price: null,
      warranty: '',
      category: '',
      color: '',
      material: '',
      seatingCapacity: null,
      weight: null,
      careAndMaintenance: '',
      stockStatus: ''
    };
  }

}
