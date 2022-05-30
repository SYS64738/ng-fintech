import {Card} from "../../models/card";
import {createFeature, createReducer, on} from "@ngrx/store";
import * as CardActions from "./card.actions";

export interface CardsState {
  cards: Card[]
}

const initialState: CardsState = {
  cards: []
}

export const cardsReducer = createReducer(
  initialState,
  on(CardActions.getCardsSuccess, (state, action) => ({...state, cards: action.cards })),
  on(CardActions.insertCardSuccess, (state, action) => ({...state, cards: [...state.cards, action.card] })),
  on(CardActions.deleteCardSuccess, (state, action) => ({...state, cards: state.cards.filter(c => c._id !== action.id)})),
);

export const cardsFeature = createFeature({
  name: 'cards',
  reducer: cardsReducer
});


