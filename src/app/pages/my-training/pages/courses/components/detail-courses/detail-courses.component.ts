import {Component, Injector, Input, OnInit} from '@angular/core';
import {BaseService} from "../../../../../../shared/services/base.service";
import {CoursesService} from "../../services/courses.service";
import {TypeClasses} from "../../../../../my-educational-system/pages/classes/services/classes.service";

@Component({
  selector: 'app-detail-courses',
  templateUrl: './detail-courses.component.html',
  styleUrl: './detail-courses.component.scss'
})
export class DetailCoursesComponent extends BaseService implements OnInit{
  @Input('itemSelect') itemSelect : any
  eventId:any
  selectedEventMaster:any
  selectEpisode:any =  {id: 1,title : 'فصل اول - مقدمه'}


  constructor(injector:Injector,private coursesService:CoursesService) {
    super(injector);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParam:any)=>{
      this.eventId = queryParam.eventId
      this.getEventDetails()

    })
  }
  getEventDetails(){
    console.log(this.userService.getUser())
    let body = {
      "eventId":this.eventId,
      "personId": 12
    }
    this.coursesService.getEventDetails(body).subscribe((data:any)=>{
      this.data = data.data
      this.selectedEventMaster = this.data?.event?.eventMasters[0]
    })
  }
  changeEventMaster(data:any,index:any,type:any){
    console.log(data,index,type)
    if (data[index + type]){
      this.selectedEventMaster = data[index + type]

    }else {
      this.selectedEventMaster = data[0]

    }

  }

  changeEpisode(item:any){
    if (this.selectEpisode == item){
      this.selectEpisode = null
    }else {
      this.selectEpisode = item

    }
  }

  protected readonly TypeClasses = TypeClasses;
}
