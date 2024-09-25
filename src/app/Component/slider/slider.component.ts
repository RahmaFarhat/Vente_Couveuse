import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
export interface Slide {
  imageUrl: string;
  captionTitle: string;
  captionText: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  cliced() {
    throw new Error('Method not implemented.');
  }
  constructor() { }

  slides: Slide[] = [
    {
      imageUrl: '../../../assets/images/couv.png',
      captionTitle: 'Couveuse intelligente',
      captionText: ''
    },
    {
      imageUrl: '../../../assets/images/couv2.png',
      captionTitle: 'Premium Collection',
      captionText: 'Elevate Your Living Space'
    },
    {
      imageUrl: '../../../assets/images/couv3.png',
      captionTitle: 'as son as possible ',
      captionText: 'Experience True Comfort'
    }
  ];

}
