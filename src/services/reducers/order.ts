import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  RESET_ORDER,
} from '../actions/order';
import { TOrderActions } from '../actions/order';

type TInitialState = {
	orderNumber: number | null;
	isOrderLoading: boolean;
	isOrderGetFailed: boolean;
  };

const initialState: TInitialState = {
  orderNumber: null,
  isOrderLoading: false,
  isOrderGetFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TInitialState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isOrderLoading: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        isOrderLoading: false,
        isOrderGetFailed: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...initialState,
        isOrderLoading: false,
        isOrderGetFailed: true,
      };
    }
    case RESET_ORDER: {
      return {
        ...initialState,
        orderNumber: null,
        isOrderLoading: false,
        isOrderGetFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};
