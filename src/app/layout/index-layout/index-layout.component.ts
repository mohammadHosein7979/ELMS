import { Component } from '@angular/core';
import {HttpService} from "../../shared/services/http.service";

@Component({
    selector: 'app-index-layout',
    templateUrl: './index-layout.component.html',
    styleUrl: './index-layout.component.scss',
    standalone: false
})
export class IndexLayoutComponent {
  isCollapsed:any
  constructor(protected http:HttpService) {
  }

}
