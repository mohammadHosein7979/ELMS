import {Injectable} from "@angular/core";


export enum TypeCourseManagement {
  createCourse = 'createCourse',
  createQuiz = 'createQuiz',
}

@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {

}
