import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from './Service/loading.service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService); // Inject the LoadingService

  const stopGlobalLoading = req.url.includes('/admin') || req.url.includes("/login") || req.url.includes("/generate-otp") || req.url.includes("/send-email") || req.url.includes("/verify-otp"); // Check if the request is for admin URLs

  if (!stopGlobalLoading) {
    loadingService.showLoading();
  }

  if (typeof localStorage !== 'undefined') {
    const authString = localStorage.getItem('basicAuth');
    if (authString) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: authString // Attach Authorization header
        }
      });

      return next(clonedRequest).pipe(
        finalize(() => {
          if (!stopGlobalLoading) {
            loadingService.hideLoading(); // Hide loader only for non-admin requests
          }
        })
      );
    }
  }

  return next(req).pipe(
    finalize(() => {
      if (!stopGlobalLoading) {
        loadingService.hideLoading(); // Hide loader only for non-admin requests
      }
    })
  );
};
