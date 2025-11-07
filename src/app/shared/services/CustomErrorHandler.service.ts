import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {HttpService} from "./http.service";

@Injectable()
export class CustomErrorHandlerService implements HttpInterceptor {
  constructor (private http: HttpService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone();

    return next.handle(newReq)
      .pipe(
        retry(1),
        catchError((error: any) => {
          let displayError = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.http.handelErrorHttp(error);
          } else {
            // server-side error
            displayError = error.error;
            this.http.handelErrorHttp(error);

          }
          return throwError(displayError);
        })
      );
  }
}
