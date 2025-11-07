import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TokenService} from "./token.service";
import {StorageService} from "../helperService/storage.service";
import {catchError, shareReplay, throwError} from "rxjs";
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

  getHttp(url: string,body:any = '') {
    let headers = new HttpHeaders().set('accept', 'application/json');
    headers = new HttpHeaders().set('accept', 'application/json').append('accept-language', 'fa');

    if (url.indexOf('http') !== 0) {
      url = this.apiUrl + url
    }
    if (url.indexOf('https') === -1) {
      url = url.replace('http', 'https')
    }
    const params = new HttpParams({fromObject: body});

    return this.httpClient.get(url, {
      headers: headers,
      params
    }).pipe(catchError(this.formatErrors));
  }
  deleteHttp(url: string,body:any = '') {
    let headers = new HttpHeaders().set('accept', 'application/json');
    headers = new HttpHeaders().set('accept', 'application/json').append('accept-language', 'fa');

    if (url.indexOf('http') !== 0) {
      url = this.apiUrl + url
    }
    if (url.indexOf('https') === -1) {
      url = url.replace('http', 'https')
    }
    const params = new HttpParams({fromObject: body});

    return this.httpClient.delete(url, {
      headers: headers,
      params
    }).pipe(catchError(this.formatErrors));
  }


  postHttp(url: string, params: any) {
    let token = this.tokenService.token();
    let headers = new HttpHeaders().set('accept', 'application/json');
    if (token && token != '') {
      headers = new HttpHeaders().set('accept', 'application/json').append('Authorization', token);
    }
    // if (url.indexOf('http')!==0){
    url = this.apiUrl + url
    // }
    return this.httpClient.post(url, params, {
      headers: headers
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
    });
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
    if (e.status == 401) {
      localStorage.clear()
      this.router.navigateByUrl('/auth/login')
      // this.toast.error('ابتدا باید در سامانه ثبت نام کنید ، در حال ورود به صفحه ثبت نام ...')
      // setTimeout(() => {
      //   this.openLogin()
      // }, 1000)


    } else if (e.status == 500) {
      this.setLoading(false);
      this.toast.error(e.error.error.message)


    } else {
      this.setLoading(false);
      this.toast.error(e.error.message)
    }
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
