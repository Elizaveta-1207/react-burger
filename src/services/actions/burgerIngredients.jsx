import { BASE_API_URL } from '../../components/App/App.jsx';

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_ERROR = 'GET_BURGER_INGREDIENTS_ERROR';

export const getBurgerIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });
    fetch(`${BASE_API_URL}/ingredients`)
      .then((res) => {
        if (res.ok) return res.json();
        else dispatch({ type: GET_BURGER_INGREDIENTS_ERROR });
      })
      .then((res) => dispatch({ type: GET_BURGER_INGREDIENTS_SUCCESS, payload: res.data }))
      .catch(() => dispatch({ type: GET_BURGER_INGREDIENTS_ERROR }));
  };
};
