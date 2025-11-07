import {Injectable, Injector, signal} from '@angular/core';
import {StorageService} from "../helperService/storage.service";
import {map, Observable} from "rxjs";
import {BaseService} from "./base.service";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService{
  token = signal(null)

  constructor(private storageService:StorageService) {
    this.getToken()
  }
  setItem(key: string, value: any) {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  changeToken(token: any) {
    this.token.set(token)
    this.setItem('token', token)
  }

  getToken() {
    let t: any = this.storageService.getItem('accessToken')
    this.token.set(t)
  }



}
