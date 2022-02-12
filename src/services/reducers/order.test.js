import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  RESET_ORDER,
} from '../actions/order';
import { orderReducer } from './order';

describe('order reducer', () => {
  it('order reducer initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      orderNumber: null,
      isOrderLoading: false,
      isOrderGetFailed: false,
    });
  });

  it('GET_ORDER_REQUEST', () => {
    expect(orderReducer(undefined, { type: GET_ORDER_REQUEST })).toEqual({
      orderNumber: null,
      isOrderLoading: true,
      isOrderGetFailed: false,
    });
  });

  it('GET_ORDER_SUCCESS', () => {
    expect(orderReducer(undefined, { type: GET_ORDER_SUCCESS, payload: 9595 })).toEqual({
      orderNumber: 9595,
      isOrderLoading: false,
      isOrderGetFailed: false,
    });
  });

  it('GET_ORDER_ERROR', () => {
    expect(orderReducer(undefined, { type: GET_ORDER_ERROR })).toEqual({
      orderNumber: null,
      isOrderLoading: false,
      isOrderGetFailed: true,
    });
  });

  it('RESET_ORDER', () => {
    expect(orderReducer(undefined, { type: RESET_ORDER })).toEqual({
      orderNumber: null,
      isOrderLoading: false,
      isOrderGetFailed: false,
    });
  });
});
