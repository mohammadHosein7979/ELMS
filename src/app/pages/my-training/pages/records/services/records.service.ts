import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {BaseService} from "../../../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
 export class RecordsService extends BaseService{
  microService:string = '/courseapi'
  getAllRecords(){
   return  this.get(`${this.microService}/EventStudent/Records`)
  }
}
