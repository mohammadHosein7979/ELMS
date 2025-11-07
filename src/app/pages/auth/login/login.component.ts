import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BaseService} from "../../../shared/services/base.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseService implements OnInit{

  formAuthenticate: FormGroup = new FormGroup(
    {
      userNameOrEmailAddress: new FormControl(),
      password: new FormControl(),
      rememberClient: new FormControl(true),
    })
  ngOnInit() {
  }
  // save(){
  //   this.post('/TokenAuth/Authenticate',this.formAuthenticate.value).subscribe(()=>{
  //
  //   })
  // }

  login(credentials:any): void {
    this.authService
      .authenticate(credentials)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe(() => {
        this.userService.init()
          .then(() => {
          window.location.href = '/'
        })
          .catch(()=>{
          this.loadingButton = false

        });
      },error => {
        this.loadingButton = false

      });
  }


  submitForm() {
    this.loadingButton = true
    if (this.formAuthenticate.valid){
      this.isSubmitting = true;
      const credentials = this.formAuthenticate.value;
      this.login(credentials);

    }else {
      this.loadingButton = false

      this.notification.error('لطفا فیلد های اجباری را پر کنید.');
    }

  }
}
