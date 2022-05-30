import {Transfer} from "../../models/transfer";
import {createFeature, createReducer, on} from "@ngrx/store";
import * as TransferActions from "./transfer.actions";

export interface TransferState {
  transfers: Transfer[]
}

const initialState: TransferState = {
  transfers: []
}

export const transferReducer = createReducer(
  initialState,
  on(TransferActions.insertTransferSuccess, (state, action) => ({...state, transfers: [...state.transfers, action.transfer]}))
)

export const transferReducerFeature = createFeature({
  name: 'transfers',
  reducer: transferReducer
});
