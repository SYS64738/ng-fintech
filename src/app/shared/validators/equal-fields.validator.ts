import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";
import {Directive, Input} from "@angular/core";

export function equalFieldsValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (fields && fields.length > 0) {
      const someEmpty = fields.some(f => !control.get(f)?.value);
      const allEquals = fields.every(f => control.get(f)?.value === control.get(fields[0])?.value);
      if (!allEquals && !someEmpty) {
        return {
          equalFields: true
        }
      }
    }
    return null;
  };
}

@Directive({
  selector: '[ngEqualFields]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EqualFieldsValidator,
      multi: true
    }
  ]
})
export class EqualFieldsValidator implements Validator {

  fields: string[] = [];
  @Input() set equalFields(val: string[]) {
    this.fields = val;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return equalFieldsValidator(this.fields)(control);
  }

}

