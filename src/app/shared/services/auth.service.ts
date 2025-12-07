import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpService } from './http.service';
import { TokenService } from './token.service';
import { JwtService } from './jwt.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private microService = `/usermanagement/Login`;
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private sessionCreated = false;
  private loaded = false;

  constructor(
    private http: HttpService,
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private jwtService: JwtService,
    private router: Router,
    private userService: UserService
  ) {}

  /** ایجاد Session اولیه (برای ست شدن کوکی) */
  createSession() {
    if (this.sessionCreated) return of(true);
    return this.http
      .getHttp(`/usermanagement/Login/CreateSession`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.sessionCreated = true;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }

  /** Login با Header (Username/Password) */
  login(username: string, password: string) {
    const headers = new HttpHeaders({
      Username: username,
      Password: password
    });

    return this.http
      .getHttp(`${this.microService}/Login`,null, {
        Username: username,
        Password: password
      })
      .pipe(
        tap(() => {
          this.currentUserSubject.next({ username });
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  /** گرفتن اطلاعات پروفایل کاربر (برای personId و غیره) */
  loadUser() {
    return this.http
      .getHttp(`/usermanagement/Profile/GetPersonInfo`, { withCredentials: true })
      .pipe(
        tap((user: any) => {
          this.currentUserSubject.next(user.data);
          this.loaded = true;
          this.userService.setUser(user.data);
        }),
        catchError((err) => {
          this.currentUserSubject.next(null);
          this.loaded = true;
          localStorage.clear()
          return of(null);
        })
      );
  }

  /** تضمین لود شدن کاربر قبل از نیاز به داده‌ها */
  ensureUserLoaded() {
    if (this.loaded) return of(true);
    return this.loadUser().pipe(map(() => true));
  }

  /** ثبت‌نام کاربر جدید */
  register(body: any) {
    return this.http
      .postHttp(`/usermanagement/Internal/Register`, body)
      .pipe(
        tap((res:any) => {
          this.currentUserSubject.next(res.data);
          this.userService.setUser(res.data);
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  /** بررسی فعال بودن Session */
  checkSession() {
    return this.http
      .getHttp(`/usermanagement/Login/CreateSession`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUserSubject.next({ active: true });
        }),
        catchError(() => {
          this.currentUserSubject.next(null);
          return of(null);
        })
      );
  }

  /** Logout کاربر */
  logout() {

    this.http.getHttp(`${this.microService}/CloseSession`).subscribe(()=>{
      this.userService.clear();
      this.currentUserSubject.next(null);
      this.loaded = false;
      this.sessionCreated = false;
      this.router.navigateByUrl('/');
    })

  }

  /** آیا لاگین است؟ */
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
