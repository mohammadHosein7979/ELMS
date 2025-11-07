import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter} from "rxjs";

export enum  IdMenu{
    index= '',
    subscribable = 'subscribable',
    consultant = 'consultant',
    bookmark = 'bookmark',
  }
@Injectable({
  providedIn: 'root'
})
export class LayoutLandingService {
  url:any
  constructor(private route : ActivatedRoute,private router:Router) {
    // router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: any) => {
    //   this.getStartUrl(event.url)
    // });
  }
  getStartUrl(event:any) {
    let value = event.split('/')[2]
    if (value){

      this.url = event.split('/')[2]
    }else {
      this.url = undefined
      if (event == '/dashboard'){
        this.changeRoutMap('')
      }
    }

  }
  approvalStageMessage:any
  currentApprovalStageMessage:any
  getMenuObservable() {
    if(this.router.url == '/dashboard'){
      this.url = ''
    }else {
       this.url = this.router.url
      // let urlArray = url.split('/')
      // let data = urlArray[urlArray.length-1]
      // this.url = data.split(/([0-9]+)/)
    }
    this.approvalStageMessage = new BehaviorSubject( this.url);
    return   this.currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  }
  changeRoutMap(item:any){
    this.url = item
    this.approvalStageMessage.next(item)
    if (item != '/'){
      this.router.navigateByUrl('/'+item)
    }else {
      this.router.navigateByUrl('/')
    }
  }
}
