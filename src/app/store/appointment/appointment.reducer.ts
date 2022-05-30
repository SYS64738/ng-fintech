import {DayWithSlot, DayWithSlots, Location} from "../../models/appointment";
import {createFeature, createReducer, on} from "@ngrx/store";
import * as AppointmentActions from "./appointment.actions";

export interface AppointmentState {
  locations: Location[],
  dayWithSlots: DayWithSlots[]
}

export const initialState: AppointmentState = {
  locations: [],
  dayWithSlots: []
}

export const appointmentReducer = createReducer(
  initialState,
  on(AppointmentActions.getLocationsSuccess, (state, action) => ({ ...state, locations: [...action.locations]})),
  on(AppointmentActions.getLocationSlotsSuccess, (state, action) => ({ ...state, dayWithSlots: [...action.dayWithSlots]}))
)

export const appointmentFeature = createFeature({
    name: 'appointments',
    reducer: appointmentReducer
  }
)
