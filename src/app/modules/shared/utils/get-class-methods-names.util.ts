import { Type } from '@angular/core';

export function getClassMethodsNames<T>(Class: Type<T>): string[] {
  const props = Object.getOwnPropertyNames(Class.prototype);
  const methodsNames = props.filter(prop => typeof Class.prototype[prop] === 'function');

  return methodsNames;
}
