import {Injectable, Injector} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpService} from "./http.service";



@Injectable()
export class UtilService{


  constructor(private injector: Injector, private http: HttpService) {}

  getImage(image:any){

    return this.http.getHttp('/FileUpload/GetImage?imageName=' + image)
  }


}
