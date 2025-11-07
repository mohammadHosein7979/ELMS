import {Component, Injector, OnInit} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss'
})
export class HeaderLayoutComponent extends BaseService implements OnInit{


  constructor( injector:Injector) {
    super(injector)
  }

  ngOnInit() {
  }

}
