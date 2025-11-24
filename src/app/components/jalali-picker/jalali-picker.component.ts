import {Component, forwardRef} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgPersianDatepickerModule} from "ng-persian-datepicker";

@Component({
  selector: "app-jalali-picker",
  template: `
    <ng-persian-datepicker
      [uiIsVisible]="false"
      (dateOnSelect)="onSelect($event)">
      <input class="input-style" type="text" [value]="value"/>
    </ng-persian-datepicker>
  `,
  standalone: true,
  imports: [NgPersianDatepickerModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JalaliPickerComponent),
    multi: true
  }]
})
export class JalaliPickerComponent {

  value: any;

  onChange = (v: any) => {};
  onTouched = () => {};

  writeValue(v: any) {
    this.value = v;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onSelect(date: any) {
    this.value = date;
    this.onChange(date);
  }
}
