import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from '../types';
import { TOrder } from '../../utils/types';
import { TWSActions } from '../actions/orders';

type TInitialState = {
  ordersAllRequest: boolean;
  ordersAllFailed: boolean;
  total: number;
  totalToday: number;
  orders: Array<TOrder>;
  wsConnected: boolean;
  error?: Event;
};

const initialState: TInitialState = {
  ordersAllRequest: false,
  ordersAllFailed: false,
  total: 0,
  totalToday: 0,
  orders: [],
  wsConnected: false
};

export const ordersReducer = (state = initialState, action: TWSActions): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        error: undefined,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: action.payload.orders
      };
    }
    default: {
      return state;
    }
  }
};
