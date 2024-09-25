import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: string | undefined = '';


  ngOnInit(): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear().toString();
  }

}
