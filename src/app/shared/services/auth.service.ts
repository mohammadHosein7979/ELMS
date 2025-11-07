import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, ReplaySubject} from "rxjs";
import {BaseService} from "./base.service";
import {ToastrService} from "ngx-toastr";
import {HttpService} from "./http.service";
import {JwtService} from "./jwt.service";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  constructor(private http:HttpService,private tokenService:TokenService,private jwtService:JwtService,private router:Router,private userService:UserService) {
  }
  loginPhone(body: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return this.http.postHttp('/authentication', body).subscribe((result: any) => {
          if (result && result.data !== undefined && result.data.token !== undefined && result.data.token != '') {
            localStorage.setItem('token', 'Bearer ' + result.data.token);
            // var u = result.data;
            // var user = new User(u.id,u.phone,u.first_name,u.last_name,u.national_code,u.birthday,u.gender,u.is_protector,u.city_id,u.education_id,u.childs_count);
            localStorage.setItem('user', JSON.stringify(result));
            // this.toast.success('ورود موفقیت آمیز');
            return resolve(true)
          } else {
            // this.toast.error('عملیات ناموفق');
            return reject(false);
          }
        },
        () => {
          // this.toast.error('عملیات ناموفق');
          return reject(false);
        });
    });
  }

  // isAuthenticate(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     var token = localStorage.getItem('token');
  //     if (token && token != '') {
  //       // let tokenExpiration: any = localStorage.getItem('tokenExpiration')
  //       let user2 = localStorage.getItem('user')
  //       let dateNow: any = Date.now();
  //       // if (dateNow - tokenExpiration > 860) {
  //       return this.http.get('/user').subscribe((data: any) => {
  //           this.setUser(data.user)
  //           return resolve({status: true, user: data.user});
  //         },
  //         (error) => {
  //           return reject({status: false, user: null,error : error});
  //         });
  //       // } else {
  //       //   return resolve({status: true, user: user2});
  //       // }
  //     } else {
  //       return reject({status: false});
  //     }
  //   })
  // }

  authenticate(credentials: any): Observable<any> {
    localStorage.removeItem('notif')
    return this.userService.authenticate(credentials).pipe(
      map(data => {
        this.setAuth(data);
        return data;
      })
    );
  }
  private currentUserSubject = new BehaviorSubject<any>({} as any);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  setAuth(auth: any) {
    this.jwtService.saveToken(auth.accessToken);
    this.jwtService.saveRefreshToken(auth.refreshToken);
    this.jwtService.saveExpireSession(auth.expireInSeconds);
    this.tokenService.setItem('userId', auth.userId);
    this.tokenService.setItem('periodId', auth.periodId);
    this.currentUserSubject.next(auth);
    this.isAuthenticatedSubject.next(true);
  }

  logout(type : any = 1) {
    localStorage.clear()
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next({} as any);
    if (type == 2){
      window.location.href = '/'

    }
  }
  initialize() {
    // If JWT Token detected
    if (this.tokenService.token()) {
      // Handle JWT token logic if needed
    } else {
      // Remove any potential remnants of previous auth states
      this.logout();
    }

    // handle Access Token Change
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === 'accessToken') {
        const routePath = event.newValue ? '/' : '/auth/login';
        this.router.navigateByUrl(routePath).then(() => location.reload());
      }
    });
  }
}
