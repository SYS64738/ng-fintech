import {createAction, props} from "@ngrx/store";
import {Transfer} from "../../models/transfer";

/**
 * INSERT
 */
export const insertTransfer = createAction('[Transfer] insertTransfer',
  props<{ transfer: Transfer }>()
);
export const insertTransferSuccess = createAction('[Transfer] insertTransfer success',
  props<{ transfer: Transfer }>()
);
export const insertTransferFail = createAction('[Transfer] insertTransfer fail');





