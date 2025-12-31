import {Component, effect, Injector, OnInit} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {MicroService} from "../../shared/enum/enum";
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-profile',
    styleUrl: './profile.component.scss',
    templateUrl: './profile.component.html',
    standalone: false
})
export class ProfileComponent extends BaseService implements OnInit {
  loadingProfile:boolean = false
  constructor(injector:Injector) {
    super(injector);
    effect(() => {
      const user = this.authService.dataUser();
      if (!user || Object.keys(user).length === 0) return;
      const patchedUser = {
        ...user,
        unixTimeBirthDate: this.unixToJalaliString(user.unixTimeBirthDate)
      };
      this.formProfile.patchValue(patchedUser);
    });
  }
  formProfile: FormGroup = this.fb.group({
    id: [null],
    name: [null, [Validators.required]],
    family: [null, [Validators.required]],
    "ncode": null,
    "unixTimeBirthDate": null,
    "gender": null,
    avatar:[ null],
    "mobile": null,
  });

  ngOnInit() {


  }
  submitForm() {
    console.log(this.formProfile.value,this.formProfile.getRawValue())
    this.loadingProfile = true
    const payload = {
      ...this.formProfile.value,
      unixTimeBirthDate: this.jalaliStringToUnix(
        this.formProfile.value.unixTimeBirthDate
      ),
      avatar:this.formProfile.value.avatar.toString()
    };
    this.put(`/${MicroService.usermanagement}/Person/Update`,payload).pipe(
      finalize(()=>{
        this.loadingProfile = false

      })).subscribe(()=>{
        this.notification.success('اطلاعات با موفقیت ذخیره شد .')
    })
  }

  protected readonly environment = environment;
  protected readonly MicroService = MicroService;
}
