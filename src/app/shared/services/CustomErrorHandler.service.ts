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
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        // ✅ بررسی پاسخ‌های موفق اما با statuscode غیردرست
        if (event instanceof HttpResponse) {
          const body = event.body;
          if (body && body.statuscode && body.statuscode !== 200) {
            // خطا درون بدنه، پرتابش کن تا بره catchError
            throw new HttpErrorResponse({
              error: body,
              status: body.statuscode,
              statusText: body.message || 'خطای منطقی از سمت API'
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
