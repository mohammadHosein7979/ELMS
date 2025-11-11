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

  getEventMaster() {
    return this.post(`/${microService.course}/EventMaster/Report`, {})
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

}
