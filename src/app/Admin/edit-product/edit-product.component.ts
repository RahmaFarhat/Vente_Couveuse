import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  categories: string[] = ['Living Room', 'Bedroom', 'Dining Room', 'Office Furniture', 'Outdoor Furniture', 'Storage Solutions'];
  stockOptions: string[] = ['In Stock', 'In Stock soon', 'Out of Stock']

  product: any = {
    title: '',
    description: '',
    price: null,
    warranty: '',
    productImages: '',
    category: '',
    color: '',
    material: '',
    seatingCapacity: null,
    weight: null,
    careAndMaintenance: '',
    stockStatus: '',
  };
  selectedFiles: File[] = [];

  constructor(private activateroute: ActivatedRoute, private productService: ProductService, private router: Router) { }


  productId: string | null = null;

  ngOnInit(): void {
    this.activateroute.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe(
          response => {
            this.product = response;
          },
          error => {
            console.error('Error fetching product:', error);
          }
        );
      }
    });
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;

    this.selectedFiles = Array.from(files);

    if (this.selectedFiles.length > 0) {
      this.product.productImages = this.selectedFiles

    }


  }
  onSubmit() {
    // console.log(this.product);

    this.productService.updateProduct(this.product, this.selectedFiles).subscribe(response => {
      Swal.fire("Product data updated!");
      this.router.navigate(['/admin/product'])
    },
      error => {
        console.log(error);

      }
    )
  }
}
