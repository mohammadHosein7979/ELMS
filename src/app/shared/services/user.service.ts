import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseService} from "./base.service";
import {HttpService} from "./http.service";

@Injectable()
export class UserService{
  private _currentUserInfo = new BehaviorSubject<any>({} as any);
  public currentUser = this._currentUserInfo.asObservable();
  private _user: any;
  private _impersonatorUser: any;
  private _tenant: any;
  private _impersonatorTenant: any;
  private _application: any;
  private _period: any;

  constructor(private injector: Injector, private http: HttpService) {}


  get application(): any {
    return this._application;
  }

  set application(val: any) {
    this._application = val;
  }

  get user(): any {
    return this._user;
  }

  get userId(): number {
    return this.user?.id ?? null;
  }

  get tenant(): any {
    return this._tenant;
  }

  get tenancyName(): string {
    return this._tenant ? this.tenant.tenancyName : '';
  }

  get tenancyLevel(): number {
    return this.tenant?.accountingLevel ?? null;
  }

  get tenantId(): number {
    return this.tenant?.id ?? null;
  }

  get tenantName(): string {
    return this.tenant?.name ?? null;
  }

  get isInAggregation(): boolean {
    return this.tenant?.isInAggregation;
  }

  getShownLoginName(): string {
    return this._user?.userName ?? '';
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  get isGuest(): boolean {
    return !this.isLoggedIn;
  }

  get isTenant(): boolean {
    return !!this.tenant;
  }

  init(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.getCurrentLoginInformation()
        .toPromise()
        .then(
          (result: any) => {
            // const permissionService = this.injector.get(PermissionService);
            // if (result.user) {
            //   permissionService.getPermissions().then();
            // }
            this._currentUserInfo.next(result);
            this._application = this.getCurrentUserInfo().application;
            this._user = result.user;
            this._tenant = this.getCurrentUserInfo().tenant;
            this._impersonatorTenant = result.impersonatorTenant;
            this._impersonatorUser = result.impersonatorUser;
            this._period = result.period;
            resolve(result);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getCurrentUserInfo() {
    return this._currentUserInfo.value;
  }

  getCurrentLoginInformation(): Observable<any> {
    return this.http.getHttp('/services/app/Session/GetCurrentLoginInformations').pipe(map((data:any) => data.result));
  }

  private isCurrentTenant(tenantId?: any) {
    const isTenant = tenantId > 0;

    if (!isTenant && !this.tenant) {
      // this is host
      return true;
    }

    if (!tenantId && this.tenant) {
      return false;
    } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
      return false;
    }

    return true;
  }

  get impersonatorUser(): any {
    return this._impersonatorUser;
  }

  get impersonatorUserId(): number {
    return this.impersonatorUser ? this.impersonatorUser.id : null;
  }

  get impersonatorTenant(): any {
    return this._impersonatorTenant;
  }

  get impersonatorTenancyName(): string {
    return this.impersonatorTenant ? this.impersonatorTenant.tenancyName : '';
  }

  get impersonatorTenantId(): number {
    return this.impersonatorTenant ? this.impersonatorTenant.id : null;
  }

  get period(): any {
    return this._period;
  }

  get periodId(): number {
    return this.period ? this.period.id : null;
  }

  get isPeriodClosed(): boolean {
    return this.period ? this.period.isClosed : null;
  }
  authenticate(body: any | undefined): Observable<any> {
    const path = '/TokenAuth/Authenticate';
    return this.http.postHttp(path, body).pipe(map((data:any) => data.result));
  }
}
