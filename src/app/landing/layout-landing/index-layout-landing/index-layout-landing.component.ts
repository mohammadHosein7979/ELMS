import { Component } from '@angular/core';
import {HttpService} from "../../../shared/services/http.service";

@Component({
    selector: 'app-index-layout-landing',
    templateUrl: './index-layout-landing.component.html',
    styleUrl: './index-layout-landing.component.scss',
    standalone: false
})
export class IndexLayoutLandingComponent {
  isCollapsed:any
  constructor(protected http:HttpService) {
  }

}
