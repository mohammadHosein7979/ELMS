import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, Observable} from "rxjs";
import {BaseService} from "../../../../../shared/services/base.service";
import {MicroService} from "../../../../../shared/enum/enum";

export enum TypeTests {
  notHeld = 'not-held',
  uncorrected = 'uncorrected',
  completed = 'completed',
}

@Injectable({
  providedIn: 'root'
})
export class TestsService extends BaseService{

  // insertQuestion(body :any) {
  //   return this.post(`/${MicroService.course}/Question/Insert`, body)
  // }
  // updateQuestion(body :any) {
  //   return this.put(`/${MicroService.course}/Question/Update`, body)
  // }
  examReport(body :any) {
    return this.post(`/${MicroService.course}/Exam/Report`, body)
  }
  // getQuestionById(body: any): Observable<any> {
  //   return this.post(`/${MicroService.course}/Question/Report`,body);
  // }

}
