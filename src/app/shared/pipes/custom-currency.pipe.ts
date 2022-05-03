import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe extends DecimalPipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    return super.transform(value, '1.2-2', args);
  }
}
