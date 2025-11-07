import { Component } from '@angular/core';
import {HttpService} from "../../shared/services/http.service";

@Component({
  selector: 'app-footer-layout',
  templateUrl: './footer-layout.component.html',
  styleUrl: './footer-layout.component.scss'
})
export class FooterLayoutComponent {
  constructor(protected http:HttpService) {
  }
}
