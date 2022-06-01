import {
  AbstractControl,
  FormControl, FormGroupDirective,
  NG_VALIDATORS,
  NgForm,
  ValidationErrors,
  Validator,
  ValidatorFn
} from "@angular/forms";
import {Directive, Input} from "@angular/core";
import {ErrorStateMatcher} from "@angular/material/core";

export function dateRangeValidator(fromDateField: string, toDateField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const from = control.get(fromDateField)?.value;
    const to = control.get(toDateField)?.value;
    if (from && to && (from > to)) {
      return { dateRange: true }
    }
    return null;
  };
}

@Directive({
  selector: '[ngDateRange]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateRangeValidator,
      multi: true
    }
  ]
})
export class DateRangeValidator implements Validator {

  fromDate: string | null = null;
  @Input() set fromDateField(val: string) {
    this.fromDate = val;
  }

  toDate: string | null = null;
  @Input() set toDateField(val: string) {
    this.toDate = val;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fromDate && this.toDate) {
      return dateRangeValidator(this.fromDate, this.toDate)(control);
    }
    return null;
  }

}

export class DateRangeErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('dateRange');
    const userActions = control?.dirty || control?.touched || form?.submitted;
    return !!((invalidControl || invalidParent) && userActions);
  }
}
