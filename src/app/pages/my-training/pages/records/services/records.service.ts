import { Injectable } from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {MicroService} from "../../../../../shared/enum/enum";

@Injectable({
  providedIn: 'root'
})
 export class RecordsService extends BaseService{
  getAllRecords(){
   return  this.get(`/${MicroService.course}/EventStudent/Records`)
  }
}
