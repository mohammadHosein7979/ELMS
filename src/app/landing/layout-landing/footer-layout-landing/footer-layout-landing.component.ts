import { Component } from '@angular/core';
import {HttpService} from "../../../shared/services/http.service";

@Component({
  selector: 'app-footer-layout-landing',
  templateUrl: './footer-layout-landing.component.html',
  styleUrl: './footer-layout-landing.component.scss'
})
export class FooterLayoutLandingComponent {
  constructor(protected http:HttpService) {
  }
}
