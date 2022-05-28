import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {Contact, ContactForm} from "../../../models/contact";
import {Store} from "@ngrx/store";
import {selectContacts, selectedContact} from "../../../store/contact/contact.selectors";
import {
  deleteContact,
  getContacts,
  insertContact,
  insertContactSuccess,
  updateContact,
  updateContactSuccess
} from "../../../store/contact/contact.actions";
import {Observable, Subscription, take} from "rxjs";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'ng-contact',
  template: `

    <!-- aad/edit contatto -->
    <ng-container *ngIf="editingMode; else contactList">

      <button
        class="button"
        style="margin-bottom: 30px"
        mat-stroked-button
        type="button"
        (click)="editingMode = false"
      >
        {{ 'transfer.contact.back' | translate }}
      </button>

      <ng-contact-form
        [contact]="(selectedContact$ | async) ?? null"
        (save)="saveContact($event)"
      ></ng-contact-form>

    </ng-container>

    <!-- lista contatti -->
    <ng-template #contactList>

      <ng-contact-list
        [contacts]="(contacts$ | async) ?? []"
        (select)="confirm($event)"
        (edit)="editContact($event)"
        (delete)="deleteContact($event)"
      ></ng-contact-list>

      <button
        class="button"
        mat-raised-button
        type="button"
        color="primary"
        (click)="addContact()"
      >
        {{ 'transfer.contact.new' | translate }}
      </button>

    </ng-template>

    <button
      *ngIf="!editingMode"
      class="button"
      mat-stroked-button
      type="button"
      color="warn"
      (click)="cancel()"
    >
      {{ 'cancel' | translate }}
    </button>

  `,
  styles: [`

    .button {
      margin-top: 10px;
      width: 100%;
    }

  `]
})
export class ContactComponent implements OnInit {

  editingMode: boolean = false;
  editingType: 'add' | 'edit' | null = null;

  contacts$ = this.store.select(selectContacts);
  selectedContact$: Observable<Contact | undefined> | null = null;
  actionsSubscriptions = new Subscription();

  constructor(public store: Store,
              private actionListener$: Actions,
              private dialogRef: MatDialogRef<ContactComponent>) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.addSaveContactHook();
    this.store.dispatch(getContacts())
  }

  addSaveContactHook() {
    this.actionsSubscriptions.add(
      this.actionListener$.pipe(
        ofType(insertContactSuccess, updateContactSuccess)
      ).subscribe(() => {
        this.editingType = null;
        this.editingMode = false;
      })
    );
  }

  markAsSelected(id: string) {
    this.selectedContact$ = this.store.select(selectedContact(id));
  }

  addContact() {
    this.editingType = 'add';
    this.editingMode = true;
  }

  editContact(id: string) {
    this.markAsSelected(id);
    this.editingType = 'edit';
    this.editingMode = true;
  }

  deleteContact(id: string) {
    this.store.dispatch(deleteContact({ id }));
  }

  saveContact(contactForm: ContactForm) {
    if (this.editingType === 'edit') {
      // edit mode...
      this.selectedContact$!.pipe(
        take(1)
      ).subscribe(contact =>
        this.store.dispatch(updateContact({ id: contact!._id, contactForm }))
      );
    } else {
      // insert mode...
      this.store.dispatch(insertContact({ contactForm }));
    }
  }

  confirm(id: string) {
    this.markAsSelected(id);
    this.selectedContact$!.pipe(
      take(1)
    ).subscribe(contact => {
      this.dialogRef.close(contact);
    });
  }

  cancel = () => this.dialogRef.close(null);

}
