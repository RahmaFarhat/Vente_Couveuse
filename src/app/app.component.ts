import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './Component/loading/loading.component';
import { NetworkStatusService } from './Service/network-status.service';
import { NoInternetComponent } from './Component/no-internet/no-internet.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NoInternetComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';

  isOnline = true;

  constructor(private networkStatusService: NetworkStatusService) { }

  ngOnInit() {
    this.networkStatusService.isOnline.subscribe(status => {
      this.isOnline = status;
    });
  }
}
