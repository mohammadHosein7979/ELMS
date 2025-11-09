import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  loading = false;
  error: string | null = null;

  form = this.fb.group({
    Phone: ['', Validators.required],
    Family: ['', Validators.required],
    Ncode: ['', Validators.required],
    Password: ['', Validators.required],
    Name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // حتماً قبل لاگین session بساز
    this.auth.createSession().subscribe();
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'تمام فیلدها الزامی است';
      return;
    }

    this.loading = true;
    this.error = null;
    this.auth.register(this.form.value!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.error = 'نام کاربری یا رمز عبور اشتباه است';
        } else {
          this.error = 'خطا در برقراری ارتباط با سرور';
        }
      }
    });
  }
}
