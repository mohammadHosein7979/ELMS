import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {BaseService} from "../../../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
 export class CoursesService extends BaseService{
  microService:string = '/courseapi'
  getAllEventList(){
   return  this.get(`${this.microService}/EventStudent/EventList`)
  }
  getAllEventType(){
   return  this.post(`${this.microService}/EventType/Report`,{})
  }
  getEventDetails(body:any){
   return  this.post(`${this.microService}/EventStudent/EventDetails`,body)
  }



}
