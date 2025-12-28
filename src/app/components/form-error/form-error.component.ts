import {Component, inject, Input, input} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Location, NgIf} from '@angular/common';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-form-error',
  imports: [
    NzButtonComponent,
    NgIf
  ],
  templateUrl: './form-error.component.html',
  standalone: true,
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent extends BaseService{
  @Input() control!: AbstractControl | null;
  @Input() submitted = false;
}
