import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ContactService} from "../../api/contact.service";
import * as ContactActions from "./contact.actions";
import {catchError, mergeMap, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class ContactEffects {

  constructor(private store: Store,
              private actions: Actions,
              private contactService: ContactService) {
  }

  getContacts$ = createEffect(() => this.actions.pipe(
    ofType(ContactActions.getContacts),
    switchMap(() => this.contactService.list().pipe(
      map(contacts => ContactActions.getContactsSuccess({contacts})),
      catchError(() => of(ContactActions.getContactsFail))
    ))
  ));

  insertContact$ = createEffect(() => this.actions.pipe(
    ofType(ContactActions.insertContact),
    mergeMap((action ) => this.contactService.insert(action.contactForm).pipe(
      map(contact => ContactActions.insertContactSuccess( { contact })),
      catchError(() => of(ContactActions.insertContactFail))
    ))
  ));

  editContact$ = createEffect(() => this.actions.pipe(
    ofType(ContactActions.updateContact),
    mergeMap(action => this.contactService.update(action.id, action.contactForm).pipe(
      map(contact => ContactActions.updateContactSuccess( { contact })),
      catchError(() => of(ContactActions.updateContactFail))
    ))
  ));

  deleteContact$ = createEffect(() => this.actions.pipe(
   ofType(ContactActions.deleteContact),
   mergeMap(action => this.contactService.delete(action.id).pipe(
     map(() => ContactActions.deleteContactSuccess( { id: action.id })),
     catchError(() => of(ContactActions.deleteContactFail))
   ))
  ))

}
