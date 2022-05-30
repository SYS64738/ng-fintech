import {appointmentFeature} from "./appointment.reducer";
import {createSelector} from "@ngrx/store";

export const {
  selectLocations,
  selectDayWithSlots
} = appointmentFeature

export const selectedLocation = (id: string) => createSelector(
  selectLocations,
  (state) => state.find(l => l._id === id)
)
