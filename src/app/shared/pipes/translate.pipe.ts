import {Injectable, Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor() {}
  transform(key: any): any {
    return true
  }

}
