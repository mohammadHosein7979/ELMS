import {Injectable} from "@angular/core";
import {BaseService} from "../../../../../shared/services/base.service";
import {MicroService} from "../../../../../shared/enum/enum";
import {Observable} from "rxjs";


export enum TypeQuestionBank {
  list = 'list',
  create = 'create',
}

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService extends BaseService{

  insertQuestion(body :any) {
    return this.post(`/${MicroService.course}/Question/Insert`, body)
  }
  updateQuestion(body :any) {
    return this.put(`/${MicroService.course}/Question/Update`, body)
  }
  questionReport(body :any) {
    return this.post(`/${MicroService.course}/Question/Report`, body)
  }
  getQuestionById(body: any): Observable<any> {
    return this.post(`/${MicroService.course}/Question/Report`,body);
  }

}
