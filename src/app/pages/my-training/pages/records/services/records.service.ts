import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {BaseService, microService} from "../../../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
 export class RecordsService extends BaseService{
  getAllRecords(){
   return  this.get(`/${microService.course}/EventStudent/Records`)
  }
}
