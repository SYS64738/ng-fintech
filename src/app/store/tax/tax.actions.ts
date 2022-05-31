import {createAction, props} from "@ngrx/store";
import {f24} from "../../models/tax";

/**
 * INSERT
 */
export const insertF24 = createAction('[Tax] InsertF24',
  props<{ card: string, model: f24 }>()
);
export const insertF24Success = createAction('[Tax] InsertF24 success',
  props<{ model: f24 }>()
);
export const insertF24Fail = createAction('[Tax] InsertF24 fail');
