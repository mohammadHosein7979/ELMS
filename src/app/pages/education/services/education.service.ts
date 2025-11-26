import {Injectable} from "@angular/core";
import { BaseService } from "../../../shared/services/base.service";
import { MicroService } from "../../../shared/enum/enum";


@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseService {

  getEventMaster(body:any) {
    return this.get(`/${MicroService.course}/Masters/Report`,{},body)
  }



  getCourse() {
    return this.post(`/${MicroService.course}/Course/Report`, {})
  }
  getEventType() {
    return this.post(`/${MicroService.course}/EventType/Report`, {})
  }
  insertEvent(body :any) {
    return this.post(`/${MicroService.course}/Event/Insert`, body)
  }
  updateEvent(body :any) {
    return this.put(`/${MicroService.course}/Event/Update`, body)
  }
  getEvent(body :any) {
    return this.post(`/${MicroService.course}/Event/Report`, body)
  }
  getPopularEvents(body :any) {
    return this.get(`/${MicroService.course}/Event/PopularEvents`, body)
  }





  getSession(filter:any) {
    return this.post(`/${MicroService.course}/Session/Report`, filter)
  }
  insertSession(body :any) {
    return this.post(`/${MicroService.course}/Session/Insert`, body)
  }
  updateSession(body :any) {
    return this.put(`/${MicroService.course}/Session/Update`, body)
  }
  removeSession(body:any) {
    return this.delete(`/${MicroService.course}/Session/Delete`, body)
  }











  getEventHeadline(filter:any) {
    return this.post(`/${MicroService.course}/EventHeadline/Report`, filter)
  }
  insertEventHeadline(body :any) {
    return this.post(`/${MicroService.course}/EventHeadline/Insert`, body)
  }
  updateEventHeadline(body :any) {
    return this.put(`/${MicroService.course}/EventHeadline/Update`, body)
  }
  removeEventHeadline(body:any) {
    return this.delete(`/${MicroService.course}/EventHeadline/Delete`, body)
  }




  getEventHeadlineDetail(filter:any) {
    return this.post(`/${MicroService.course}/EventHeadlineDetail/Report`, filter)
  }
  insertEventHeadlineDetail(body :any) {
    return this.post(`/${MicroService.course}/EventHeadlineDetail/Insert`, body)
  }
  updateEventHeadlineDetail(body :any) {
    return this.put(`/${MicroService.course}/EventHeadlineDetail/Update`, body)
  }
  removeEventHeadlineDetail(body:any) {
    return this.delete(`/${MicroService.course}/EventHeadlineDetail/Delete`, body)
  }




  eventStudentInsert(body :any) { 
    return this.post(`/${MicroService.course}/EventStudent/Insert`, body)
  }


}
