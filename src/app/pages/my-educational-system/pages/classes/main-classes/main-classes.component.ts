import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {SwiperComponent} from "swiper/angular";
import {Params} from "@angular/router";
import {LayoutService} from "../../../../../layout/services/layout.service";
import {ClassesService, TypeClasses} from "../services/classes.service";
import {data} from "autoprefixer";
import {finalize} from "rxjs";

@Component({
  selector: 'app-main-classes',
  templateUrl: './main-classes.component.html',
  styleUrl: './main-classes.component.scss'
})
export class MainClassesComponent extends BaseService implements OnInit{
  type : any

  dataType : any =[
    {id:1,type : TypeClasses.online,title : 'کلاس های آنلاین',image : 'online-service.svg'},
    {id:2,type : TypeClasses.offline,title : 'کلاس های آفلاین',image : 'online-movie-streaming-player-video.svg'},
    {id:3,type : TypeClasses.faceToFace,title : 'کلاس های حضوری',image : 'classroom.svg'},
  ]
  constructor(injector:Injector,protected layoutService:LayoutService,protected classesService:ClassesService) {
    super(injector);
  }

  ngOnInit() {
    this.getQueryParams()
  }
  getQueryParams(){
    this.route.queryParams.subscribe((query:any)=>{
      this.type = query?.type
      this.getData()
      // this.data = this.list.filter((item:any)=>item.type == this.type)
    })
  }
  getData(){
    this.loading = true
    let body = {
      masterId : this.personId,
      eventTypeId : this.type
    }
    this.classesService.getMasters(body).pipe(finalize(()=>{
      this.loading = false
    })).subscribe((data:any)=>{
      this.data = data?.data
    })
  }

  onSwiper(swiper: any) {
    return swiper;
  }

  onSlideChange(e: any) {

  }
  changeType(item:any){
    let route : any = '/my-educational-system/classes?type='+item.type
    this.layoutService.changeRoutMap(route)
  }


  @ViewChild(SwiperComponent) swiper: any;

}
