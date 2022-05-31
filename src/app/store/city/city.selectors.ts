import {citiesFeature} from "./city.reducer";
import {createSelector} from "@ngrx/store";

export const {
  selectCities
} = citiesFeature

export const selectFilteredCities = (name: string) => createSelector(
  selectCities,
  (state) => state
    .map(c => c.nome)
    .filter(c => name ? c.toLowerCase().includes(name.toLowerCase()) : true)
)

export const selectFilteredDistrict = (name: string) => createSelector(
  selectCities,
  (state) => {
    const unique = [...new Set(state.map(c => c.provincia.nome))];
    return unique
      .filter(d => name ? d.toLowerCase().includes(name.toLowerCase()) : true)
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
