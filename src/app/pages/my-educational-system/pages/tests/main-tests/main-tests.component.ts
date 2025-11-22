import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {LayoutService} from "../../../../../layout/services/layout.service";
import {SwiperComponent} from "swiper/angular";
import {TypeTests} from "../services/tests.service";

@Component({
    selector: 'app-main-tests',
    templateUrl: './main-tests.component.html',
    styleUrl: './main-tests.component.scss',
    standalone: false
})
export class MainTestsComponent extends BaseService implements OnInit{
  type : any

  dataType : any =[
    {id:1,type : TypeTests.notHeld,title : 'آزمون های برگزار نشده',image : 'tests.svg', route: TypeTests.notHeld},
    {id:2,type : TypeTests.uncorrected,title : 'آزمون های تصحیح نشده',image : 'online-movie-streaming-player-video.svg', route: TypeTests.uncorrected},
    {id:3,type : TypeTests.completed,title : 'آزمون های پایان یافته',image : 'classroom.svg',route: TypeTests.completed},
  ]

  constructor(injector:Injector,protected layoutService:LayoutService) {
    super(injector);
  }

  ngOnInit() {
  }

  isActive(item: any): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes(`/tests/${item.route}`);
  }

  onSwiper(swiper: any) {
    return swiper;
  }

  onSlideChange(e: any) {

  }
  // changeType(item:any){
  //   let route : any = '/my-educational-system/tests?type='+item.type
  //   this.layoutService.changeRoutMap(route)
  // }
  changeType(item: any) {
    // تغییر به route مربوطه
    const route = `/my-educational-system/tests/${item.route}`;
    this.router.navigate([route]);

    // اگر نیاز دارید route map را هم آپدیت کنید
    this.layoutService.changeRoutMap(route);
  }


  @ViewChild(SwiperComponent) swiper: any;
}
