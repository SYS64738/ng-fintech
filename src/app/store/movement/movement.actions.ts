import {createAction, props} from "@ngrx/store";
import {MovementList} from "../../models/movement";

/**
 * CARD
 */
export const setCard = createAction('[Movements] setCard',
  props<{ card: string }>()
);

/**
 * GET MOVEMENTS
 */
export const getMovements = createAction('[Movements] getMovements',
  props<
    {
      cardId: string,
      limit?: number,
      offset?: number
    }>()
);
export const getNextMovements = createAction('[Movements] getNextMovements');
export const getMovementsSuccess = createAction('[Movements] getMovements success',
  props<{ movements: MovementList }>()
);
export const getMovementsFail = createAction('[Movements] getMovements fail');

