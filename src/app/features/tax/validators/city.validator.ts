import {Injectable, OnInit} from "@angular/core";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, take} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {getCities} from "../../../store/city/city.actions";
import {selectCities, selectDistricts} from "../../../store/city/city.selectors";

@Injectable({
  providedIn: 'root'
})
export class CityValidator implements OnInit {

  cities$ = this.store.select(selectCities);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getCities());
  }

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const formCity = control.value;
      return this.cities$.pipe(
        take(1),
        map(cities => {
          if (cities.find(c => c.nome === formCity)) {
            return null;
          }
          return { city: true };
        })
      )
    }
  }

}
