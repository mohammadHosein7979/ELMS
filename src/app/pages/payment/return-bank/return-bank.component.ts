import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpService} from "../../../shared/services/http.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-return-bank',
  templateUrl: './return-bank.component.html',
  standalone:false,
  styleUrls: ['./return-bank.component.scss']
})
export class ReturnBankComponent implements OnInit {
  constructor(private route:ActivatedRoute,private router:Router) { }
  data:any

  ngOnInit(): void {
    this.route.queryParams.subscribe((data:any)=>{
      this.data = data
    })
  }
  goToDashboard(status:any){
    if (status == 1){
      // this.auth.getUserData().then(()=>{
      //   this.router.navigateByUrl('/dashboard?subscription')
      //   let ii = this.dialog.open(SuccessfulSubscription);
      //   let instance = ii.componentInstance;
      //   instance.type = 1;
      // })

    }else {
      this.router.navigateByUrl('/dashboard?subscription')
    }
  }

}
