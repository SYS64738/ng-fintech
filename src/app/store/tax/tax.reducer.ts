import {createFeature, createReducer, on} from "@ngrx/store";
import * as TaxActions from "./tax.actions";
import {f24} from "../../models/tax";


export interface TaxState {
  f24s: f24[]
}

const initialState: TaxState = {
  f24s: []
}

export const taxesReducer = createReducer(
  initialState,
  on(TaxActions.insertF24Success, (state, action) => ({...state, f24s: [...state.f24s, action.model]})),
)

export const taxesFeature = createFeature({
  name: 'taxes',
  reducer: taxesReducer
});
