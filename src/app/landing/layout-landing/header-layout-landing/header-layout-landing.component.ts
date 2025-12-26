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
  navigateAndScroll(item: any) {
    if (!item || !item.url) {
      console.error('Menu item is invalid:', item);
      return;
    }

    if (item.url !== this.router.url) {
      this.router.navigate([item.url]).then(() => {
        if (item.anchor) {
          this.scrollToAnchor(item.anchor);
        }
      });
    } else {
      if (item.anchor) {
        this.scrollToAnchor(item.anchor);
      }
    }
  }


  scrollToAnchor(anchor: string) {
    const OFFSET = 70; // ارتفاع هدر sticky

    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (!el) return;

      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }, 0);
  }


}
