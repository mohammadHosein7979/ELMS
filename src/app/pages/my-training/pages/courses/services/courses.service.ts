import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {BaseService, microService} from "../../../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
 export class CoursesService extends BaseService{
  getAllEventList(){
   return  this.get(`/${microService.course}/EventStudent/EventList`)
  }
  getAllEventType(){
   return  this.post(`/${microService.course}/EventType/Report`,{})
  }
  getEventDetails(body:any){
   return  this.post(`/${microService.course}/EventStudent/EventDetails`,body)
  }



}
