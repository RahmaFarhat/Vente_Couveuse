import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { ProductSectionComponent } from '../products-all-section/product-section.component';
import { RouterLink } from '@angular/router';
import { LatestproductComponent } from '../latestproduct/latestproduct.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, LatestproductComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
