import {movementsFeature} from "./movement.reducer";
import {createSelector} from "@ngrx/store";

export const {
  selectLimit,
  selectOffset,
  selectTotal,
  selectMovements,
  selectCard
} = movementsFeature;

export const selectMovementsByCard = createSelector(
  selectMovements,
  selectCard,
  (movements, card) => {
  }
)

export const isOtherMovements = createSelector(
  selectMovements,
  selectTotal,
  (movements, total) => movements.length > 0 && movements.length < total
)

export const selectPartial = createSelector(
  selectMovements,
  (movements) => movements.length
)
