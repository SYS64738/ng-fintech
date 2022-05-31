import {citiesFeature} from "./city.reducer";
import {createSelector} from "@ngrx/store";

export const {
  selectCities
} = citiesFeature

export const selectFilteredCities = (name: string) => createSelector(
  selectCities,
  (state) => state
    .map(c => c.nome)
    .filter(c => c.toLowerCase().includes(name.toLowerCase()))
)

export const selectFilteredDistrict = (name: string) => createSelector(
  selectCities,
  (state) => {
    const unique = [...new Set(state.map(c => c.provincia.nome))];
    return unique
      .filter(d => d.toLowerCase().includes(name.toLowerCase()))
      .sort();
  }
)

// TODO: gestire filtro reciproco provincia-comune...
export const selectCitiesByDistrict = (district: string, name: string) => createSelector(
  selectCities,
  (state) => state
    .filter(c => district !== '' ? c.provincia.nome === district : true)
    .map(c => c.nome)
    .filter(c => c.toLowerCase().includes(name.toLowerCase()))
)
