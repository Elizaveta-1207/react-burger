import { BASE_API_URL, retriableFetch, getCookie } from '../../utils/constants';
import { AppThunk, AppDispatch } from '../reducers';
import { TRes } from '../../utils/types';


export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const RESET_ORDER = 'RESET_ORDER';

type TGetOrderActionRequest = { readonly type: typeof GET_ORDER_REQUEST };
type TGetOrderActionSuccess = { readonly type: typeof GET_ORDER_SUCCESS; readonly payload: number };
type TGetOrderActionError = { readonly type: typeof GET_ORDER_ERROR };

type TResetOrderAction = { readonly type: typeof RESET_ORDER };

export type TOrderActions = TGetOrderActionRequest | TGetOrderActionSuccess | TGetOrderActionError | TResetOrderAction;

export const getOrder: AppThunk = (itemsId) => 
   (dispatch: AppDispatch) => {
	const accessToken = getCookie('accessToken');
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    retriableFetch<TRes>(`${BASE_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
		authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ ingredients: itemsId }),
    })
      .then((res) => dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number }))
      .catch(() => dispatch({ type: GET_ORDER_ERROR }));
  };


export const clearOrder = (): TResetOrderAction => {
	return { type: RESET_ORDER };
};
