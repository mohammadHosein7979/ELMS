import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {BaseService} from "../../../../../shared/services/base.service";
import {MicroService} from "../../../../../shared/enum/enum";

@Injectable({
  providedIn: 'root'
})
 export class CoursesService extends BaseService{
  getAllEventList(){
   return  this.get(`/${MicroService.course}/EventStudent/EventList`)
  }
  getAllEventType(){
   return  this.post(`/${MicroService.course}/EventType/Report`,{})
  }
  getEventDetails(body:any){
   return  this.post(`/${MicroService.course}/EventStudent/EventDetails`,body)
  }

  getSession(body:any){
   return  this.post(`/${MicroService.course}/Session/Report`,body)
  }



}
