import {cardsFeature} from "./card.reducer";
import {createSelector} from "@ngrx/store";

export const {
  selectCards
} = cardsFeature;

export const selectCard = (id: string) => createSelector(
  selectCards,
  (state) => state.find(c => c._id === id)
)

export const existsCard = (number: string) => createSelector(
  selectCards,
  (state) => state.findIndex(c => c.number === number) !== -1
)
