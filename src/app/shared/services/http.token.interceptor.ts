import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtService} from "./jwt.service";
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  private readonly headerKey: string;

  constructor(private jwtService: JwtService) {
    this.headerKey = 'Authorization';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig:any = {
      'Accept': 'application/json'
    };

    if (!req.headers.has('Content-Type') && !(req.body instanceof FormData)) {
      headersConfig['Content-Type'] = 'application/json; charset=utf-8';
    }

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request);
  }
}
