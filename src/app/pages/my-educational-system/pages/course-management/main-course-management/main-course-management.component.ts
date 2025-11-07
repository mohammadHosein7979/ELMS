import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {LayoutService} from "../../../../../layout/services/layout.service";
import {SwiperComponent} from "swiper/angular";
import {TypeCourseManagement} from "../services/course-management.service";

@Component({
  selector: 'app-main-course-management',
  templateUrl: './main-course-management.component.html',
  styleUrl: './main-course-management.component.scss'
})
export class MainCourseManagementComponent  extends BaseService implements OnInit{
  type : any

  dataType : any =[
    {id:1,type : TypeCourseManagement.createCourse,title : 'ایجاد دوره',image : 'exam-svgrepo-com.svg'},
    {id:2,type : TypeCourseManagement.createQuiz,title : 'ایجاد آزمون',image : 'i-exam-multiple-choice-svgrepo-com.svg'},
  ]

  list : any =[
    {
      id: 1 ,title : 'کلاس تدبری در زندگی',type : 'online', image : 'assets/image/remove/Frame388.png' , description : '' , status : 'ورود به کلاس',time : 'پنجشنبه 22 مرداد  ساعت 11:20'
    },{
      id: 2 ,title : 'کلاس تدبری در زندگی',type : 'online', image : 'assets/image/remove/Frame388.png' , description : '' , status : 'اتصال لینک کلاس',time : 'پنجشنبه 22 مرداد  ساعت 11:20',link: 'https://www.google.com/search?client=firefox-b-d&q=googel+meet'
    },{
      id: 3 ,title : 'کلاس تدبری در زندگی',type : 'offline', image : 'assets/image/remove/Frame388.png' , description : 'توضیحات دوره تدبری در زندگی ' , status : 'منتشر شده'
    },{
      id: 4 ,title : 'کلاس تدبری در زندگی',type : 'offline', image : 'assets/image/remove/Frame388.png' , description : 'توضیحات دوره تدبری در زندگی ' , status : 'در حال بررسی'
    },{
      id: 5 ,title : 'کلاس تدبری در زندگی',type : 'face-to-face', image : 'assets/image/remove/Frame388.png' , description : 'توضیحات دوره تدبری در زندگی' ,time : 'تاریخ : پنج شنبه 22 مهر سال 1403' , lok:'قم - پردیسان - پارک علم و فناروری - مروارید 3 - واحد 6 - اتاق جلسات - شماره تماس (096569988776666)'
    },
  ]

  constructor(injector:Injector,protected layoutService:LayoutService) {
    super(injector);
  }

  ngOnInit() {
    this.getQueryParams()
  }
  getQueryParams(){
    this.type = this.dataType[0]?.type

    // this.route.queryParams.subscribe((query:any)=>{
    //   this.type = query?.type
    //   this.data = this.list.filter((item:any)=>item.type == this.type)
    // })
  }

  onSwiper(swiper: any) {
    return swiper;
  }

  onSlideChange(e: any) {

  }
  changeType(item:any){
    this.type = item?.type
    // let route : any = '/my-educational-system/question-bank?type='+item.type
    // this.layoutService.changeRoutMap(route)
  }

  @ViewChild(SwiperComponent) swiper: any;

  protected readonly TypeCourseManagement = TypeCourseManagement;
}
