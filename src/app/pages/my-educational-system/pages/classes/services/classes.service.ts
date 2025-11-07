import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter} from "rxjs";
import {BaseService} from "../../../../../shared/services/base.service";

export enum TypeClasses {
  online = '1',
  offline = '2',
  faceToFace = '3',
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends BaseService{
  microService:string = '/courseapi'

  getMasters(body:any) {
    return this.post(`${this.microService}/Masters/Report`, body)
  }

}
