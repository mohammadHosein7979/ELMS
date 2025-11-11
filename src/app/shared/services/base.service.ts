import {Injectable, Injector, OnInit, signal} from "@angular/core";
import {HttpService} from "./http.service";
import {AuthService} from "./auth.service";
import {NotifyService} from "../helperService/notification.service";
import {StorageService} from "../helperService/storage.service";
import {map, Observable, of, shareReplay} from "rxjs";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UserService} from "./user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "./token.service";
import {JwtService} from "./jwt.service";
import {Title} from "@angular/platform-browser";
import {UtilService} from "./util.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {FormBuilder} from "@angular/forms";
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  loading: boolean = true
  isSubmitting = false;
  loadingTable: boolean = true
  loadingButton: boolean = false
  personId:any = null

  dataSelectedRow: any = ''

  data: any
  http: HttpService;
  fb: FormBuilder;
  authService: AuthService;
  tokenService: TokenService;
  jwtService: JwtService;
  userService: UserService;
  utilService: UtilService;
  router: Router;
  notification: NotifyService;
  storageService: StorageService;
  titleService: Title;
  httpClient: HttpClient;
  route: ActivatedRoute;
  flagMobile: boolean = false

  constructor(injector: Injector) {
    this.http = injector.get(HttpService);
    this.authService = injector.get(AuthService);
    this.fb = injector.get(FormBuilder);
    this.notification = injector.get(NotifyService);
    this.tokenService = injector.get(TokenService);
    this.jwtService = injector.get(JwtService);
    this.userService = injector.get(UserService);
    this.utilService = injector.get(UtilService);
    this.storageService = injector.get(StorageService);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.httpClient = injector.get(HttpClient);
    this.titleService = injector.get(Title);
    // this.getDataUser()
    this.flagMobile = window.screen.width < 765
    this.personId = this.authService.getCurrentUser()?.id
  }


  get(url: string,body:any = '',extraHeaders?: Record<string, string>) {
    this.loading = true
    let http = this.http.getHttp(url,body,extraHeaders)
    this.loading = false
    return http
  }

  getByServices(url: string, cache: boolean = false,body:any=null) {
    this.loading = true
    let http = cache ? this.http.getCacheHttp('/services/app' + url) : this.http.getHttp('/services/app' + url,body)
    this.loading = false
    return http
  }

  getCache(url: string) {
    return this.http.getCacheHttp(url)
  }

  post(url: string, data: any) {
    return this.http.postHttp(url, data)
  }

  postByServices(url: string, data: any, cache: boolean = false) {
    this.loading = true
    let http = cache ? this.http.postHttp('/services/app' + url, data) : this.http.postHttp('/services/app' + url, data)
    this.loading = false
    return http
  }

  // getDataUser() {
  //   return this.userService.user
  // }

  handelError(e: any) {
    return this.http.handelErrorHttp(e)
  }

  changeLoading(loading: boolean) {
    this.http.setLoading(loading)
  }

  getIds(items: any[]) {
    return items.map(item => item.id);
  }


  checkUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return Number(urlParams.get('id')) || 0;

  }

  getTitleUrlForList() {
    return this.titleService.getTitle()
  }

  getTitleUrlForCreate() {
    return 'ایجاد ' + this.titleService.getTitle()
  }

  GetEnumsDetail(body: Array<string>) {
    return this.http.getHttp('/General/GetEnumsDetail', {'EnumNames': body}).pipe(map((data: any) => data.result));
  }

  deleteItem(data: any, id: any, path: string) {
    this.http.deleteHttp('/services/app/' + path + '/Delete?Id=' + id).subscribe((item: any) => {
      let index: any = data.findIndex((i: any) => i.id == id)
      data.splice(index, 1)
    })
  }

  setDataSelectedRow(data: any) {
    if (data.id == this.dataSelectedRow?.id) {
      this.dataSelectedRow = ''
    } else {
      this.dataSelectedRow = data

    }
  }


  getUrl() {
    return '/'
  }


  pageSize = 20;
  pageIndex = 1;
  filter: Array<{ key: string; value: any }> = []
  total = 1;

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loadingTable = true;
    this.getDataGetAll(pageIndex, pageSize, sortField, sortOrder, this.filter).subscribe(data => {
      this.loadingTable = false;
      this.data = data.result.items
      this.total = data.result.totalCount
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex, sort, filter} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }


  getDataGetAll(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: any }>
  ): Observable<any> {
    let params = new HttpParams()
      .append('Page', `${pageIndex}`)
      .append('PageCount', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    if (filters && filters.length > 0) {
      filters.forEach(filter => {
        // filter.value.forEach(value => {
          params = params.append(filter.key, filter.value);
        // });
      });
    }

    return this.httpClient.get(this.http.apiUrl + this.getUrl() + '/GetAll', {params})
  }


  visible = '';

  reset(type:any): void {
    // this.searchValue = '';
    this.search('',type);
  }


  search(value:any='',key : any = ''): void {
    this.visible = key;
    let value2:any = this.filter.find((i:any)=>i.key == key)
    if (value2){
      value2.value = value
    }else {
      this.filter.push({key : key,value: value})
    }
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, this.filter);
  }
  trackByFn(index:any, item:any): number {
    return item.id || index;
  }
}
export enum microService {
  course = 'courseapi'
}
