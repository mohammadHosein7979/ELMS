import {Component, Injector, OnInit} from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {HeaderLayoutLandingService} from "./services/header-layout-landing.service";

@Component({
    selector: 'app-header-layout-landing',
    templateUrl: './header-layout-landing.component.html',
    styleUrl: './header-layout-landing.component.scss',
    standalone: false
})
export class HeaderLayoutLandingComponent extends BaseService implements OnInit{


  constructor( injector:Injector,protected headerLayoutLandingService : HeaderLayoutLandingService) {
    super(injector)
  }

  ngOnInit() {
  }

}
