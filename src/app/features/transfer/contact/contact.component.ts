import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {Contact, ContactForm} from "../../../models/contact";
import {ContactService} from "../../../api/contact.service";
import {Observable} from "rxjs";

@Component({
  selector: 'ng-contact',
  template: `

    <!-- nuovo contatto -->
    <ng-container *ngIf="editMode; else contactList">

      <button
        class="button"
        style="margin-bottom: 30px"
        mat-stroked-button
        type="button"
        (click)="editMode = false"
      >
        {{ 'transfer.contact.back' | translate }}
      </button>

      <ng-contact-form
        [contact]="selectedContact"
        (save)="upsertContact($event)"
      ></ng-contact-form>

    </ng-container>

    <!-- lista contatti -->
    <ng-template #contactList>

      <ng-contact-list
        [contacts]="contacts"
        (select)="confirm($event)"
        (edit)="editContact($event)"
      ></ng-contact-list>

      <button
        class="button"
        mat-raised-button
        type="button"
        color="primary"
        (click)="editContact()"
      >
        {{ 'transfer.contact.new' | translate }}
      </button>

    </ng-template>

    <button
      *ngIf="!editMode"
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

  editMode: boolean = false;
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService,
              private dialogRef: MatDialogRef<ContactComponent>) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.list()
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }

  editContact(_id?: string) {
    if (_id) {
      const sc = this.contacts.find(c => c._id === _id);
      if (sc) {
        this.selectedContact = {...sc};
        this.editMode = true;
      }
    } else {
      this.selectedContact = null;
      this.editMode = true;
    }
  }

  upsertContact(contact: ContactForm) {
    if (this.selectedContact) {
      // edit mode...
      this.contactService.update(this.selectedContact._id, contact)
        .subscribe(updatedContact => {
          this.contacts = this.contacts.filter(c => c._id !== this.selectedContact?._id);
          this.upsertContactCompleted(updatedContact);
        });
    } else {
      // insert mode...
      this.contactService.insert(contact)
        .subscribe(insertedContact => {
          this.upsertContactCompleted(insertedContact);
        });
    }
  }

  upsertContactCompleted(contact: Contact) {
    this.contacts = [...this.contacts, contact];
    this.editMode = false;
  }

  confirm = (_id: string) => this.dialogRef.close(this.contacts.find(c => c._id === _id));
  cancel = () => this.dialogRef.close(null);

}
