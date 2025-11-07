import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {LayoutService} from "../../../../../layout/services/layout.service";
import {SwiperComponent} from "swiper/angular";
import {TypeQuestionBank} from "../services/question-bank.service";

@Component({
  selector: 'app-main-question-bank',
  templateUrl: './main-question-bank.component.html',
  styleUrl: './main-question-bank.component.scss'
})
export class MainQuestionBankComponent extends BaseService implements OnInit{
  type : any

  dataType : any =[
    {id:1,type : TypeQuestionBank.list,title : 'لیست سوالات',image : 'exam-svgrepo-com.svg'},
    {id:2,type : TypeQuestionBank.create,title : 'ثبت سوال جدید',image : 'i-exam-multiple-choice-svgrepo-com.svg'},
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
    this.route.queryParams.subscribe((query:any)=>{
      this.type = query?.type
      this.data = this.list.filter((item:any)=>item.type == this.type)
    })
  }

  onSwiper(swiper: any) {
    return swiper;
  }

  onSlideChange(e: any) {

  }
  changeType(item:any){
    let route : any = '/my-educational-system/question-bank?type='+item.type
    this.layoutService.changeRoutMap(route)
  }

  @ViewChild(SwiperComponent) swiper: any;

  protected readonly TypeQuestionBank = TypeQuestionBank;
}
