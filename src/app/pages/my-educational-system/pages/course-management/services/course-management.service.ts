import {Injectable} from "@angular/core";
import {BaseService, microService} from "../../../../../shared/services/base.service";


export enum TypeCourseManagement {
  createCourse = 'createCourse',
  listCourse = 'ListCourse',
}

@Injectable({
  providedIn: 'root'
})
export class CourseManagementService extends BaseService {

  getEventMaster(body:any) {
    return this.get(`/${microService.course}/Masters/Report`,{},body)
  }



  getCourse() {
    return this.post(`/${microService.course}/Course/Report`, {})
  }
  getEventType() {
    return this.post(`/${microService.course}/EventType/Report`, {})
  }
  insertEvent(body :any) {
    return this.post(`/${microService.course}/Event/Insert`, body)
  }



  getEventHeadline(filter:any) {
    return this.post(`/${microService.course}/EventHeadline/Report`, filter)
  }
  insertEventHeadline(body :any) {
    return this.post(`/${microService.course}/EventHeadline/Insert`, body)
  }
  updateEventHeadline(body :any) {
    return this.put(`/${microService.course}/EventHeadline/Update`, body)
  }
  removeEventHeadline(body:any) {
    return this.delete(`/${microService.course}/EventHeadline/Delete`, body)
  }




  getEventHeadlineDetail(filter:any) {
    return this.post(`/${microService.course}/EventHeadlineDetail/Report`, filter)
  }
  insertEventHeadlineDetail(body :any) {
    return this.post(`/${microService.course}/EventHeadlineDetail/Insert`, body)
  }
  updateEventHeadlineDetail(body :any) {
    return this.put(`/${microService.course}/EventHeadlineDetail/Update`, body)
  }
  removeEventHeadlineDetail(body:any) {
    return this.delete(`/${microService.course}/EventHeadlineDetail/Delete`, body)
  }


}
