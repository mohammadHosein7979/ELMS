import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {UserService} from "./user.service";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{
  constructor(private userService:UserService,private router:Router) {
  }
  getPathFromUrl(url: string) {
    return url.split("?")[0];
  }

  canActivate(route: any, state: any): Observable<boolean> | boolean {
    if (!this.userService.user) {
      this.router.navigate(['/auth/login']).then();
      return of(false);
    }

    return of(true);
  }

  canActivateChild(route: any, state: any): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: any): Observable<boolean> | boolean {
    return this.canActivate(route.data, null);
  }
}
