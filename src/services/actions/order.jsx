import { BASE_API_URL } from '../../components/App/App.jsx';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const RESET_ORDER = 'RESET_ORDER';

export const getOrder = (itemsId) => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch(`${BASE_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ingredients: itemsId }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else dispatch({ type: GET_ORDER_ERROR });
      })
      .then((res) => dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number }))
      .catch(() => dispatch({ type: GET_ORDER_ERROR }));
  };
};

export const clearOrder = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_ORDER,
    });
  };
};
