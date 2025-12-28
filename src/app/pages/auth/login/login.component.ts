import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";
import {finalize, interval, Subscription} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {HttpService} from "../../../shared/services/http.service";

@Component({
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
  standalone: false
})
export class LoginComponent implements OnInit {
  // تب‌ها
  activeTabIndex = 0;
  // OTP flow state
  otpStep: 'enterPhone' | 'verifyCode' = 'enterPhone';
  loadingButton = false;
  otpSending = false;
  otpVerifying = false;
  resendDisabled = false;
  resendCountdown = 0; // ثانیه
  private countdownSub?: Subscription;

  // فرم‌ها
  phoneForm = this.fb.group({
    Phone: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]]
  });

  otpForm = this.fb.group({
    Code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
  });

  // password flow
  passwordForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  // API base (اگر لازم تغییر بده)
  private apiBase = '/usermanagement';

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private auth: AuthService,
    private msg: NzMessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // حتماً سشن اولیه ساخته شود تا کوکی ست شود
    this.auth.createSession().subscribe();
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
  }

  formSubmitted = false;

  /* =======================
     OTP (phone -> code) flow
     ======================= */

  sendOtp() {
    this.formSubmitted = true;
    if (this.phoneForm.invalid) {
      this.phoneForm.markAllAsTouched();
      return;
    }
    this.otpSending = true;

    // TODO: جای این endpoint رو با endpoint واقعی بک‌اند تنظیم کن
    // مثال فرضی: POST /Login/SendOtp  body: { phone }
    const url = `${this.apiBase}/Login/LoginPhone`; // اگر endpoint متفاوت است تغییر بده
    this.http.postHttp(url, null, {Phone: this.phoneForm.value.Phone}).pipe(
      finalize(() => {
        this.otpSending = false
        this.formSubmitted = false;

      })
    ).subscribe({
      next: (res: any) => {
        // فرض می‌کنیم سرور موفقیت را نشان می‌دهد
        this.msg.success('کد تایید ارسال شد');
        this.otpStep = 'verifyCode';
        this.startResendCountdown(60); // 60 ثانیه قبل از resend
      },
      error: (err) => {
        console.error('sendOtp error', err);
        this.msg.error(err?.error?.message || 'خطا در ارسال کد تایید');
      }
    });
  }

  verifyOtp() {
    this.formSubmitted = true;

    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }
    this.loadingButton = true
    const Phone = this.phoneForm.value.Phone;
    const Code = this.otpForm.value.Code;
    this.otpVerifying = true;

    // TODO: جای این endpoint رو با endpoint واقعی بک‌اند تنظیم کن
    // مثال فرضی: POST /Login/VerifyOtp  body: { phone, code }
    const url = `${this.apiBase}/Login/LoginPhoneAcept`; // اگر endpoint متفاوت است تغییر بده
    this.http.postHttp(url, null, {Phone: Phone, Code: Code}).pipe(
      finalize(() => {
        this.otpVerifying = false
        this.loadingButton = false
        this.formSubmitted = false;
      })
    ).subscribe({
      next: (res: any) => {
        // فرض: backend بعد از تایید سشن/لاگین را برقرار می کند
        this.msg.success('تایید موفق — خوش آمدید');
        // حالا پروفایل کاربر را load کن تا personId تنظیم شود
        this.auth.loadUser().subscribe({
          next: () => {
            window.location.href = '/panel';

            // this.router.navigate(['/panel']); // مقصد دلخواه
          },
          error: () => {
            window.location.href = '/';

            // this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        console.error('verifyOtp error', err);
        this.msg.error(err?.error?.message || 'کد تایید نامعتبر است');
      }
    });
  }

  resendOtp() {
    if (this.resendDisabled) return;
    // همان sendOtp دوباره
    this.sendOtp();
  }

  private startResendCountdown(seconds: number) {
    this.resendDisabled = true;
    this.resendCountdown = seconds;
    this.countdownSub?.unsubscribe();
    this.countdownSub = interval(1000).subscribe(() => {
      this.resendCountdown--;
      if (this.resendCountdown <= 0) {
        this.resendDisabled = false;
        this.countdownSub?.unsubscribe();
      }
    });
  }

  /* =======================
     Password flow (phone + password)
     ======================= */
  loginWithPassword() {
    this.formSubmitted = true
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.loadingButton = true

    const {username, password} = this.passwordForm.value;


    this.auth.login(username!, password!).pipe(
      finalize(() => {
        this.loadingButton = false
        this.formSubmitted = false


      })
    ).subscribe({
      next: () => {
        // this.loading = false;
        window.location.href = '/panel';
        // this.router.navigate(['/panel']);
      },
      error: (err) => {
        // this.loading = false;
        if (err.status === 401) {
          // this.error = 'نام کاربری یا رمز عبور اشتباه است';
        } else {
          // this.error = 'خطا در برقراری ارتباط با سرور';
        }
      }
    });

  }

  /* =======================
     Helpers
     ======================= */

  // برای نمایش متن دکمه resend
  get resendText() {
    return this.resendDisabled ? `ارسال مجدد (${this.resendCountdown}s)` : 'ارسال مجدد کد';
  }
}
