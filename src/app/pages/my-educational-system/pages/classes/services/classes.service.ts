import {Injectable} from "@angular/core";

import {BaseService} from "../../../../../shared/services/base.service";
import {MicroService} from "../../../../../shared/enum/enum";

export enum TypeClasses {
  online = '1',
  offline = '2',
  faceToFace = '3',
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends BaseService{

  getMasters(body:any) {
    return this.post(`/${MicroService.course}/Masters/Report`, body)
  }

}
