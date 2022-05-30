import {createAction, props} from "@ngrx/store";
import {DayWithSlot, DayWithSlots, Location} from "../../models/appointment";

/**
 * GET LOCATIONS
 */
export const getLocations = createAction('[Appointments] getLocations');
export const getLocationsSuccess = createAction('[Appointments] getLocations success',
  props<{ locations: Location[] }>()
);
export const getLocationsFail = createAction('[Appointments] getLocations fail');

/**
 * GET LOCATION SLOTS
 */
export const getLocationSlots = createAction('[Appointments] getLocationSlots',
  props<{ locationId: string}>()
);
export const getLocationSlotsSuccess = createAction('[Appointments] getLocationSlots success',
  props<{ dayWithSlots: DayWithSlots[] }>()
);
export const getLocationSlotsFail = createAction('[Appointments] getLocationSlots fail');

/**
 * SCHEDULE
 */
export const schedule = createAction('[Appointments] Schedule',
  props<{ dayWithSlot: DayWithSlot }>()
);
export const scheduleSuccess = createAction('[Appointments] Schedule success');
export const scheduleFail = createAction('[Appointments] Schedule fail');
