import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayIncludes'
})
export class ArrayIncludesPipe implements PipeTransform {
  transform(value: any, item: any): boolean {
    return Array.isArray(value) && value.includes(item);
  }
}
