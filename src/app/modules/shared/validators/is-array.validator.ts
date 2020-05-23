import { FormControl } from '@angular/forms';

export function isArrayValidator({ value }: FormControl): object | null {
  return Array.isArray(value) ? null : { isArray: false };
}
