import {contactFeature} from "./contact.reducer";
import {createSelector} from "@ngrx/store";

export const {
  selectContacts,
} = contactFeature

export const selectedContact = (id: string) => createSelector(
  selectContacts,
  (state) => state.find(c => c._id === id)
)
