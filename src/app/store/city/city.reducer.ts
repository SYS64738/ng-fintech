import {Comune} from "../../models/city";
import {createAction, createFeature, createReducer, on} from "@ngrx/store";
import * as CityAction from "./city.actions";

export interface CityState {
  cities: Comune[]
}

export const initialState: CityState = {
  cities: []
}

export const citiesReducer = createReducer(
  initialState,
  on(CityAction.getCitiesSuccess, (state, action) => ({...state, cities: action.cities}))
)

export const citiesFeature = createFeature({
  name: 'cities',
  reducer: citiesReducer
})
