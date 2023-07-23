import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_CODE } from '../directives/add-flag.directive';

@Pipe({
  name: 'countryCode',
  standalone: true,
})
export class CountryCodePipe implements PipeTransform {
  transform(value: string, defaultValue?: string): string {
    return (
      COUNTRY_CODE[value as keyof typeof COUNTRY_CODE] ?? defaultValue ?? 'NO'
    );
  }
}
