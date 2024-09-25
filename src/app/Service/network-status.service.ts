import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  private onlineStatus = new BehaviorSubject<boolean>(this.isBrowser ? navigator.onLine : true);

  constructor() {
    if (this.isBrowser) {
      window.addEventListener('online', this.updateOnlineStatus.bind(this));
      window.addEventListener('offline', this.updateOnlineStatus.bind(this));
    }
  }

  private get isBrowser() {
    return typeof window !== 'undefined' && typeof window.navigator !== 'undefined';
  }

  private updateOnlineStatus(event: Event) {
    const status = this.isBrowser ? navigator.onLine : true;
    this.onlineStatus.next(status);
  }

  get isOnline() {
    return this.onlineStatus.asObservable();
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('online', this.updateOnlineStatus.bind(this));
      window.removeEventListener('offline', this.updateOnlineStatus.bind(this));
    }
  }
}
