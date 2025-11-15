import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'highlight',
    standalone: false
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchTerm: string): string {
    if (!searchTerm || !value) {
      return value;
    }
    return value.replace(new RegExp(searchTerm, 'gi'), '<span class="highlight">$&</span>');
  }
}

@NgModule({
  declarations: [HighlightPipe],
  exports: [HighlightPipe]
})
export class FilterPipeModule {}
