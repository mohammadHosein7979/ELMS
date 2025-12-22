import { Component, inject, input } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { Location } from '@angular/common';
import { NgPersianDatepickerModule } from "ng-persian-datepicker";
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-persian-datepicker',
  imports: [
    NgPersianDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  templateUrl: './persian-datepicker.component.html',
  standalone: true,
  styleUrl: './persian-datepicker.component.scss'
})
export class PersianDatepickerComponent extends BaseService {
  constrolName = input('')
  dateFormat = input('jYYYY/jMM/jDD HH:mm:ss')
  placeholder = input('')
  timeFlag = input(false)
  timeShowFlag = input(false)

  dd(){
    console.log(this.constrolName())
  }
}
