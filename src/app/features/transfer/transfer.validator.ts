import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs";
import {CardService} from "../../api/card.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransferValidator {

  constructor(private cardService: CardService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const fgCard = (control as FormGroup).get('card')?.value;
      const fgAmount = (control as FormGroup).get('amount')?.value;
      return this.cardService.list().pipe(
        map(cards => cards.find(c => c._id === fgCard)),
        map(card => {
          if (card) {
            return card.amount >= fgAmount ? null : {transfer: card.amount};
          }
          return null;
        })
      )
    }
  }

}
