import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {UserService} from "../../shared/services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // همیشه کوکی Session همراه شود
    let req = request.clone({ withCredentials: true });

    // گرفتن personId از userService
    const personId = this.userService.personId;
    const skip = ['/Login', '/Register', '/CreateSession'].some(path =>
      req.url.includes(path)
    );

    // فقط برای درخواست‌هایی که نیاز به personId دارند
    if (personId && !skip) {
      if (req.body && typeof req.body === 'object') {
        req = req.clone({
          body: { ...req.body, personId }
        });
      } else {
        req = req.clone({
          setHeaders: { personId: personId.toString() }
        });
      }
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.warn('Unauthorized → redirecting to login');
          this.userService.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}
