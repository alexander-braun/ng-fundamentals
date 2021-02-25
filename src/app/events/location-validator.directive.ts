import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LocationValidatorDirective,
      multi: true,
    },
  ],
})
export class LocationValidatorDirective implements Validator {
  validate(formGroup: FormGroup): { [key: string]: any } {
    const { address, city, country } = formGroup.controls;
    const { onlineUrl } = (<FormGroup>formGroup.root).controls;

    console.log(address.value, city.value, country.value, onlineUrl.value);

    if (
      (address &&
        address.value &&
        city &&
        city.value &&
        country &&
        country.value &&
        onlineUrl &&
        onlineUrl.value) ||
      (onlineUrl && onlineUrl.value)
    ) {
      console.log('null');
      return null;
    } else {
      console.log('false');
      return { validateLocation: false };
    }
  }
}
