import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateService} from "./shared/services/update.service";
import {BaseService} from "./shared/services/base.service";
import {TokenService} from "./shared/services/token.service";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends BaseService implements OnInit {
  title = 'Angular17Project';
  constructor(injector:Injector,private UpdateService: UpdateService) {
    super(injector)
  }
  flag: boolean = true
  ngOnInit() {
    // this.authService.initialize();
    // this.seoService.boot();
    this.UpdateService.checkForUpdate();
  }
}
