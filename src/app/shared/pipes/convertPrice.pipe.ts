import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'convertDate',
    standalone: false
})
export class ConvertPricePipe implements PipeTransform {
  transform(value: any,type:string): any {
      value += '';
      return value.replace(/\B(?=(\d{3})+(?!\d))/g,type)
  }
}
