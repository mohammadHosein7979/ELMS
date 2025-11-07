import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "./shared/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AppInitializer {
  constructor(private injector: Injector, private router: Router, private userService: UserService) {}

  init(): () => Promise<any> {
    return () => {
      return new Promise<any>((resolve, reject) => {
        this.userService.init().then(
            (result: any) => resolve(result),
            (err: any) => {
            setTimeout(() => this.router.navigateByUrl(`/pages/500`));
            resolve(err); //reject(err)
          }
        );
      });
    };
  }
}
