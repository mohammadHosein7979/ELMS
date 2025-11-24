// pipes/thousands-separator.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsSeparator',
  standalone: false
})
export class ThousandsSeparatorPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || value === undefined || value === '') {
      return '0';
    }

    // تبدیل به عدد
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numberValue)) {
      return '0';
    }

    // تبدیل به رشته با جداکننده هزارگان
    return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
