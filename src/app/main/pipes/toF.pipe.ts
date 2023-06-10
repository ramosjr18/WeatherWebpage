import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toF',
})
export class toF implements PipeTransform {
  transform(value: number): string {
    const fahrenheit = (value * 9) / 5 + 32;
    const rounded = Math.round(fahrenheit);
    return `${rounded}`;
  }
}
