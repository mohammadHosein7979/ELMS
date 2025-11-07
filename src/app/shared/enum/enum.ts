import {Injectable,} from '@angular/core';

export enum EnumEducationStatus {
  Buy = 0,
  Register = 1,
  Full = 2,
}
export enum EnumEducationType {
  Online = 1,
  Offline = 0,
  InPerson = 2,
}

@Injectable({
  providedIn: 'root'
})
export class Enum {


}
