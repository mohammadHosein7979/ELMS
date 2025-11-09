import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";
import {map, Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.ensureUserLoaded().pipe(
      map(() => {
        console.log(this.auth.isLoggedIn())
        if (!this.auth.isLoggedIn()) {
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }

}
