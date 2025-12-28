import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";
import { BaseService } from '../../../shared/services/base.service';
import {finalize} from "rxjs";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
        styleUrl: './register.component.scss',

    standalone: false
})
export class RegisterComponent extends BaseService implements OnInit {

loadingRegister:boolean = false
  isRegister : boolean = false
  error: string | null = null;

  form = this.fb.group({
    Phone: ['', Validators.required],
    Family: ['', Validators.required],
    Ncode: ['', Validators.required],
    Password: ['', Validators.required],
    Name: ['', Validators.required]
  });


  ngOnInit() {
    // حتماً قبل لاگین session بساز
    this.authService.createSession().subscribe();
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'تمام فیلدها الزامی است';
      return;
    }

    this.loadingRegister = true;
    this.error = null;
    this.authService.register(this.form.value!).pipe(
      finalize(() => {
        this.loadingRegister = false;
      })
    ).subscribe({
      next: (res:any) => {
        if(res?.erroCode != 200){
        this.error = res?.message;
        }else {
          this.notification.success('ثبت نام با موفقیت انجامع  شد');
          this.router.navigate(['/auth/login']);// بعد از ثبت نام ببر به صفحه لاگین
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.error = 'نام کاربری یا رمز عبور اشتباه است';
        } else {
          this.error = 'خطا در برقراری ارتباط با سرور';
        }
      }
    });
  }


  changeForm(){
    this.isRegister = !this.isRegister
  }
}
