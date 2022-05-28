import {Contact} from "../../models/contact";
import {createFeature, createReducer, on} from "@ngrx/store";
import * as ContactActions from "./contact.actions";

export interface ContactState {
  contacts: Contact[],
}

const initialState: ContactState = {
  contacts: [],
}

export const contactsReducer = createReducer(
  initialState,
  on(ContactActions.getContactsSuccess, (state, action) => ({...state, contacts: action.contacts})),
  on(ContactActions.insertContactSuccess, (state, action) => ({...state, contacts: [...state.contacts, action.contact]})),
  on(ContactActions.updateContactSuccess, (state, action) => {
    return {
      ...state,
      contacts: state.contacts.map(c => c._id === action.contact._id ? action.contact : c)
    }
  }),
  on(ContactActions.deleteContact, (state, action) => {
    return {
      ...state,
      contacts: state.contacts.filter(c => c._id !== action.id)
    }
  })
);

export const contactFeature = createFeature({
  name: 'contacts',
  reducer: contactsReducer
});

