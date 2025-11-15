import {Injectable, Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'translate',
    standalone: false
})
export class TranslatePipe implements PipeTransform {
  constructor() {}
  transform(key: any): any {
    return true
  }

}
