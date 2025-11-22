import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseService } from "../../../../../shared/services/base.service";
import { LayoutService } from "../../../../../layout/services/layout.service";
import { SwiperComponent } from "swiper/angular";
import { TypeQuestionBank } from "../services/question-bank.service";

@Component({
  selector: 'app-main-question-bank',
  templateUrl: './main-question-bank.component.html',
  styleUrl: './main-question-bank.component.scss',
  standalone: false
})
export class MainQuestionBankComponent extends BaseService implements OnInit {

  dataType: any = [
    { id: 1, type: TypeQuestionBank.list, title: 'لیست سوالات', image: 'exam-svgrepo-com.svg', route: 'list' },
    { id: 2, type: TypeQuestionBank.create, title: 'ثبت سوال جدید', image: 'i-exam-multiple-choice-svgrepo-com.svg', route: 'create' },
  ]

  constructor(injector: Injector, protected layoutService: LayoutService) {
    super(injector);
  }

  ngOnInit() {
  }

  // چک کردن active بودن آیتم منو
  isActive(item: any): boolean {
    const currentUrl = this.router.url;
    console.log(this.router.url,`/tests/${item.route}`);

    return currentUrl.includes(`/question-bank/${item.route}`);
  }

  onSwiper(swiper: any) {
    return swiper;
  }

  onSlideChange(e: any) {
    // منطق مورد نیاز
  }

  changeType(item: any) {
    // تغییر به route مربوطه
    const route = `/my-educational-system/question-bank/${item.route}`;
    this.router.navigate([route]);

    // اگر نیاز دارید route map را هم آپدیت کنید
    this.layoutService.changeRoutMap(route);
  }

  @ViewChild(SwiperComponent) swiper: any;
}
