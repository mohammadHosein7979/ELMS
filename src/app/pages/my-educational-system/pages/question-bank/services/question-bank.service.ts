import {Injectable} from "@angular/core";
import {BaseService, microService} from "../../../../../shared/services/base.service";


export enum TypeQuestionBank {
  list = 'list',
  create = 'create',
}

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService extends BaseService{

  insertQuestion(body :any) {
    return this.post(`/${microService.course}/Question/Insert`, body)
  }


}
