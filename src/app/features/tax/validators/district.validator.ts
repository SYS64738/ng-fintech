import {Injectable, OnInit} from "@angular/core";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, take} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {getCities} from "../../../store/city/city.actions";
import {selectDistricts} from "../../../store/city/city.selectors";

@Injectable({
  providedIn: 'root'
})
export class DistrictValidator implements OnInit {

  districts$ = this.store.select(selectDistricts());

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getCities());
  }

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const formDistrict = control.value;
      return this.districts$.pipe(
        take(1),
        map(districts => {
          if (districts.find(d => d === formDistrict)) {
            return null;
          }
          return { district: true };
        })
      )
    }
  }

}
