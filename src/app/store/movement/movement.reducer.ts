import {Movement} from "../../models/movement";
import {createFeature, createReducer, on} from "@ngrx/store";
import {getMovementsSuccess, setCard} from "./movement.actions";
import {environment} from "../../../environments/environment";

export interface MovementState {
  movements: Movement[]
  card: string | null
  limit: number
  offset: number
  total: number
}

const initialState: MovementState = {
  movements: [],
  card: null,
  limit: environment.movementLimit,
  offset: 0,
  total: 0
}

export const movementsReducer = createReducer(
  initialState,
  on(setCard, (state, action) => {
    return {
      ...state,
      movements: [],
      card: action.card,
      offset: 0,
      total: 0
    }
  }),
  on(getMovementsSuccess, (state, action) => {
    return {
      ...state,
      movements: [...state.movements, ...action.movements.data],
      offset: state.offset + state.limit,
      total: action.movements.total
    }
  })
);

export const movementsFeature = createFeature({
  name: 'movements',
  reducer: movementsReducer
})
