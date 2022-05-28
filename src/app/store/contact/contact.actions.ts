import {createAction, props} from "@ngrx/store";
import {Contact, ContactForm} from "../../models/contact";

/**
 * GET CONTACTS
 */
export const getContacts = createAction('[Contacts] getContacts');
export const getContactsSuccess = createAction('[Contacts] getContacts success',
  props<{ contacts: Contact[] }>()
);
export const getContactsFail = createAction('[Contacts] getContacts fail');

/**
 * ADD
 */
export const insertContact = createAction('[Contact] insertContact',
  props<{ contactForm: ContactForm }>()
);
export const insertContactSuccess = createAction('[Contacts] insertContact success',
  props<{ contact: Contact }>()
);
export const insertContactFail = createAction('[Contacts] insertContact fail');

/**
 * EDIT
 */
export const updateContact = createAction('[Contact] updateContact',
  props<{ id: string, contactForm: ContactForm }>()
);
export const updateContactSuccess = createAction('[Contacts] updateContact success',
  props<{ contact: Contact }>()
);
export const updateContactFail = createAction('[Contacts] updateContact fail');

/**
 * REMOVE
 */
export const deleteContact = createAction('[Contacts] deleteContact',
  props<{ id: string }>()
);
export const deleteContactSuccess = createAction('[Contacts] deleteContact success',
  props<{ id: string }>()
);
export const deleteContactFail = createAction('[Contacts] deleteContacts fail');
