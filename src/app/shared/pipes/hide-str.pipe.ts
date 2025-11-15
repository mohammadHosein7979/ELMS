import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hideStr',
    standalone: false
})
export class HideStrPipe implements PipeTransform {

  transform(value: any, length: any): any {

    let text = value.split('');
    if (text.length > length){
      text = text.slice(0, length) ;
      text.push('...');
      return text.join('') ;
    }
    else {
      return text.join('') ;
    }
  }

}
