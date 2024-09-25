import { Component } from '@angular/core';
import { ProductSectionComponent } from '../products-all-section/product-section.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-furniture',
  standalone: true,
  imports: [ProductSectionComponent, CommonModule, FormsModule],
  templateUrl: './furniture.component.html',
  styleUrl: './furniture.component.css'
})
export class FurnitureComponent {



  filterText: string = '';

  search: string = '';


  onSearch() {
    this.search = this.filterText
  }




}
