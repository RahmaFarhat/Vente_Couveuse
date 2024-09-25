import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingService } from '../../Service/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  isLoading = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) { }
}
