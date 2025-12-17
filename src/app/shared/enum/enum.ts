import {Injectable,} from '@angular/core';

export enum EnumEducationStatus {
  Buy = 0,
  Register = 1,
  Full = 2,
}
export enum EnumEducationType {
  Online = 1,
  Offline = 2,
  InPerson = 3,
}
export enum MicroService {
  course = 'courseapi',
  mediaapi = 'mediaapi',
  usermanagement = 'usermanagement',
}

@Injectable({
  providedIn: 'root'
})
export class Enum {


}
