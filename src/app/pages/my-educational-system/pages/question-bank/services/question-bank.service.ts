import {Injectable} from "@angular/core";
import {BaseService} from "../../../../../shared/services/base.service";
import {MicroService} from "../../../../../shared/enum/enum";


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
  questionReport(body :any) {
    return this.post(`/${MicroService.course}/Question/Report`, body)
  }


}
