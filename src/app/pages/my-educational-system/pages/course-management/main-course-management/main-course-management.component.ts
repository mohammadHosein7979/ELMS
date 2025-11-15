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
    {id:1,type : TypeCourseManagement.listCourse,routerLink : '/panel/my-educational-system/course-management',title : 'لیست دوره',image : 'i-exam-multiple-choice-svgrepo-com.svg'},
    {id:2,type : TypeCourseManagement.createCourse,routerLink : '/panel/my-educational-system/course-management/create',title : 'ایجاد دوره',image : 'exam-svgrepo-com.svg'},
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
