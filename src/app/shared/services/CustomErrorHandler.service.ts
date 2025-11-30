import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable()
export class CustomErrorHandlerService implements HttpInterceptor {
  constructor(private http: HttpService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // اگر دانلود فایل یا ویدیو بود، دست نزن بهش
    if (req.responseType === 'blob' || req.responseType === 'text') {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body;

          if (body && body.statuscode && body.statuscode !== 200) {
            throw new HttpErrorResponse({
              error: body,
              status: body.statuscode,
              statusText: body.message || 'خطا'
            });
          }
        }
        return event;
      }),
      catchError((error: any) => {
        this.http.handelErrorHttp(error);
        return throwError(() => error);
      })
    );
  }

}
