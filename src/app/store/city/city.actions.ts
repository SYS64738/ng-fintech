import {createAction, props} from "@ngrx/store";
import {Comune} from "../../models/city";

/**
 * GET CITIES
 */
export const getCities = createAction('[Cities] getCities');
export const getCitiesSuccess = createAction('[Cities] getCities success',
  props<{ cities: Comune[] }>()
);
export const getCitiesFail = createAction('[Cities] getCities fail');
