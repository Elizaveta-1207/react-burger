import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from '../types';
import { TOrder } from '../../utils/types';

type TWSConnectionStart = { readonly type: typeof WS_CONNECTION_START; readonly payload: string };
type TWSConnectionClosed = { readonly type: typeof WS_CONNECTION_CLOSED; readonly payload?: any };
type TWSConnectionError = { readonly type: typeof WS_CONNECTION_ERROR; readonly payload: Event };
type TWSConnectionSuccess = { readonly type: typeof WS_CONNECTION_SUCCESS; readonly payload?: any };
type TWSConnectionGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: { total: number; totalToday: number; orders: Array<TOrder> };
};
type TWSConnectionSendMessage = { readonly type: typeof WS_SEND_MESSAGE; readonly payload?: any };

export type TWSActions =
  | TWSConnectionStart
  | TWSConnectionSuccess
  | TWSConnectionSendMessage
  | TWSConnectionGetMessage
  | TWSConnectionError
  | TWSConnectionClosed;
