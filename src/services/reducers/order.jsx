import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  RESET_ORDER,
} from '../actions/order';

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderError: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false,
        orderError: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderError: true,
      };
    }
    case RESET_ORDER: {
      return {
        ...state,
        orderNumber: null,
        orderRequest: false,
        orderError: false,
      };
    }
    default: {
      return state;
    }
  }
};
