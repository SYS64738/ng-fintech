
export type CardType = 'visa' | 'mastercard';

export interface Card {
  _id: string,
  number: string,
  ownerId: string,
  owner: string,
  surname: string,
  name: string,
  type: CardType,
  amount: number
}

export interface CardForm {
  type: CardType,
  name: string,
  surname: string,
  number: string,
  csc: string,
}
