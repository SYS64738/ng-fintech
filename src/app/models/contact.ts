
export interface Contact {
  _id: string;
  name: string;
  surname: string;
  iban: string;
}

export type ContactForm = Omit<Contact, '_id'>;
