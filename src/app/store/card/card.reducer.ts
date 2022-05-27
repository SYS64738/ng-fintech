import {Card} from "../../models/card";
import {createFeature, createReducer, on} from "@ngrx/store";
import {insertCardSuccess, getCardsSuccess, deleteCardSuccess} from "./card.actions";

export interface CardsState {
  cards: Card[]
}

const initialState: CardsState = {
  cards: []
}

export const cardsReducer = createReducer(
  initialState,
  on(getCardsSuccess, (state, action) => {
    return {
      ...state,
      cards: action.cards
    }
  }),
  on(insertCardSuccess, (state, action) => {
    return {
      ...state,
      cards: [...state.cards, action.card]
    }
  }),
  on(deleteCardSuccess, (state, action) => {
    return {
      ...state,
      cards: state.cards.filter(c => c._id !== action.id)
    }
  }),
);

export const cardsFeature = createFeature({
  name: 'cards',
  reducer: cardsReducer
});


