import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {StorageService} from "../helperService/storage.service";
import {catchError, Observable, shareReplay, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {BaseService} from "./base.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public readonly apiUrl: string;

  private formatErrors(e: any) {
    return throwError(e);
  }

  constructor(
    private httpClient: HttpClient,
    private toast: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    // private storageService: StorageService,
    // private httpService: HttpService
  ) {
    this.apiUrl = `${environment.apiUrl}`;
  }

  // getHttp(url: string, body: any = '', extraHeaders?: Record<string, string>) {
  //   // هدر پایه
  //   let headers = new HttpHeaders()
  //     .set('accept', 'application/json')
  //     .append('accept-language', 'fa');
  //
  //   // اضافه کردن هدرهای سفارشی در صورت وجود
  //   if (extraHeaders && typeof extraHeaders === 'object') {
  //     Object.entries(extraHeaders).forEach(([key, value]) => {
  //       if (value !== undefined && value !== null) {
  //         headers = headers.append(key, value.toString());
  //       }
  //     });
  //   }
  //
  //   // اصلاح URL
  //   if (url.indexOf('http') !== 0) {
  //     url = this.apiUrl + url;
  //   }
  //   if (url.indexOf('https') === -1) {
  //     url = url.replace('http', 'https');
  //   }
  //
  //   // پارامترهای GET
  //   const params = new HttpParams({ fromObject: body });
  //
  //   // ارسال درخواست
  //   return this.httpClient
  //     .get(url, {
  //       headers,
  //       withCredentials: true,
  //       params
  //     })
  //     .pipe(catchError(this.formatErrors));
  // }
  getHttp(
    url: string,
    body: any = '',
    extraHeaders?: Record<string, string>,
    opts: { responseType?: 'json' | 'text' | 'arraybuffer' | 'blob' } = { responseType: 'json' }
  ): Observable<any> {

    // Normalize URL
    if (url.indexOf('http') !== 0) {
      url = this.apiUrl + url;
    }
    if (url.indexOf('https') === -1) {
      url = url.replace('http', 'https');
    }

    // Default headers based on desired responseType
    let headers = new HttpHeaders()
      .set('accept-language', 'fa');

    // set a sensible Accept header unless caller overrides it in extraHeaders
    if (!extraHeaders || !Object.keys(extraHeaders).some(k => k.toLowerCase() === 'accept')) {
      if (opts.responseType === 'json') {
        headers = headers.set('accept', 'application/json');
      } else if (opts.responseType === 'text') {
        headers = headers.set('accept', 'text/plain');
      } else {
        // for blob/arraybuffer use a permissive accept
        headers = headers.set('accept', '*/*');
      }
    }

    // Merge extraHeaders (caller headers override defaults)
    if (extraHeaders && typeof extraHeaders === 'object') {
      Object.entries(extraHeaders).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // use set() so caller can override any header
          headers = headers.set(key, value.toString());
        }
      });
    }

    // Build params from body (for GET)
    const params = new HttpParams({ fromObject: body });

    // Make request with requested responseType
    const responseType = opts.responseType || 'json';

    return this.httpClient.get(url, {
      headers,
      withCredentials: true,
      params,
      // Typescript needs a cast because Angular overloads responseType
      responseType: responseType as any
    })
      .pipe(
        catchError(this.formatErrors)
      );
  }
  // deleteHttp(url: string,body:any = '') {
  //   let headers = new HttpHeaders().set('accept', 'application/json');
  //   headers = new HttpHeaders().set('accept', 'application/json').append('accept-language', 'fa');
  //
  //   if (url.indexOf('http') !== 0) {
  //     url = this.apiUrl + url
  //   }
  //   if (url.indexOf('https') === -1) {
  //     url = url.replace('http', 'https')
  //   }
  //   const params = new HttpParams({fromObject: body});
  //
  //   return this.httpClient.delete(url, {
  //     headers: headers,
  //     withCredentials: true,
  //     params
  //   }).pipe(catchError(this.formatErrors));
  // }
  deleteHttp(url: string, body: any = '') {
    let headers = new HttpHeaders()
      .set('accept', 'application/json')
      .append('accept-language', 'fa');

    if (!url.startsWith('http')) {
      url = this.apiUrl + url;
    }
    if (url.startsWith('http:')) {
      url = url.replace('http:', 'https:');
    }

    return this.httpClient.delete(url, {
      headers,
      withCredentials: true,
      body // ✅ حالا بدنه ارسال می‌شود
    }).pipe(catchError(this.formatErrors));
  }


  postHttp(url: string, params: any, extraHeaders?: Record<any, any>) {
    let token = this.tokenService.token();

    // پایه هدرها
    let headers = new HttpHeaders().set('accept', 'application/json');

    // اضافه کردن Authorization در صورت وجود
    if (token && token !== '') {
      headers = headers.append('Authorization', token);
    }

    // اضافه کردن هدرهای سفارشی در صورت پاس دادن
    if (extraHeaders && typeof extraHeaders === 'object') {
      Object.entries(extraHeaders).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          headers = headers.append(key, value.toString());
        }
      });
    }

    // اتصال base URL
    url = this.apiUrl + url;

    // ارسال درخواست
    return this.httpClient.post(url, params, {
      headers,
      withCredentials: true
    });
  }

  putHttp(url: string, params: any) {
    let token = this.tokenService.token();
    let headers = new HttpHeaders().set('accept', 'application/json');
    if (token && token != '') {
      headers = new HttpHeaders().set('accept', 'application/json').append('Authorization', token);
    }
    // if (url.indexOf('http')!==0){
    url = this.apiUrl + url
    // }
    return this.httpClient.put(url, params, {
      headers: headers
    }).pipe(catchError(this.formatErrors));
  }

  scrollTop() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  loading: boolean = false

  openLogin(url = window.location.href) {
    window.location.href = 'https://my.ttfn.ir?callback_url=' + url
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }

  handelErrorHttp(e: any) {
    this.setLoading(false);

    if (e.status === 401) {
      localStorage.clear();
      this.router.navigateByUrl('/auth/login');
      return;
    }

    // اگه status == 400 یا از سمت body اومده بود
    if (e.status === 400 || e.error?.statuscode === 400) {
      this.toast.error(e.error?.message || 'داده نامعتبر است');
      return;
    }

    if (e.status === 500) {
      this.toast.error(e.error?.message || 'خطای داخلی سرور');
      return;
    }

    // بقیه‌ی خطاها
    this.toast.error(e.error?.message || 'خطای ناشناخته');
  }

  dataAll: any = []

  getCacheHttp(url: string) {
    this.loading = true
    const existingData = this.dataAll.find((item: any) => item.id === url);
    if (existingData && existingData.data.id === url) {
      return existingData.data.data;
    }
    const dataEventRoadMap =' this.httpService.getHttp(url).pipe(shareReplay(1))';
    const newData = {id: url, data: dataEventRoadMap, name: url};
    this.dataAll.push({data: newData, id: url});
    this.loading = false
    return dataEventRoadMap;
  }

}
