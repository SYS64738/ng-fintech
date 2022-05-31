import {citiesFeature} from "./city.reducer";
import {createSelector} from "@ngrx/store";

export const {
  selectCities
} = citiesFeature

export const selectFilteredCities = (name: string) => createSelector(
  selectCities,
  (state) => state.filter(c => c.nome.toLowerCase().includes(name.toLowerCase()))
)
