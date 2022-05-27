import {createAction, props} from "@ngrx/store";
import {Card, CardForm} from '../../models/card'

/**
 * GET CARDS
 */
export const getCards = createAction('[Cards] getCards');
export const getCardsSuccess = createAction('[Cards] getCards success',
  props<{ cards: Card[] }>()
);
export const getCardsFail = createAction('[Cards] getCards fail');

/**
 * GET CARD
 */
export const getCard = createAction('[Cards] getCard',
  props<{ id: string }>()
);
export const getCardSuccess = createAction('[Cards] getCard success',
  props<{ card: Card }>()
);
export const getCardFail = createAction('[Cards] getCard fail');

/**
 * ADD
 */
export const insertCard = createAction('[Cards] insertCard',
  props<{ cardForm: CardForm }>()
);
export const insertCardSuccess = createAction('[Cards] insertCard success',
  props<{ card: Card }>()
);
export const insertCardFail = createAction('[Cards] insertCard fail');

/**
 * REMOVE
 */
export const deleteCard = createAction('[Cards] deleteCard',
  props<{ id: string }>()
);
export const deleteCardSuccess = createAction('[Cards] deleteCard success',
  props<{ id: string }>()
);
export const deleteCardFail = createAction('[Cards] deleteCard fail');
