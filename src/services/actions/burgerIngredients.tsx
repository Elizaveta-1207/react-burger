import { BASE_API_URL } from '../../utils/constants';
import { AppThunk, AppDispatch } from '../reducers';
import { TIngredientType } from '../../utils/types';
export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_ERROR = 'GET_BURGER_INGREDIENTS_ERROR';

type TGetBurgerIngredientsActionRequest = { readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST };
type TGetBurgerIngredientsActionSuccess = {
  readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredientType>;
};
type TGetBurgerIngredientsActionError = { readonly type: typeof GET_BURGER_INGREDIENTS_ERROR };

export type TGetBurgerIngredientsActions =
  | TGetBurgerIngredientsActionRequest
  | TGetBurgerIngredientsActionSuccess
  | TGetBurgerIngredientsActionError;

const getBurgerIngredientsRequest = (): TGetBurgerIngredientsActionRequest => {
  return { type: GET_BURGER_INGREDIENTS_REQUEST };
};

const getBurgerIngredientsSuccess = (
  data: Array<TIngredientType>,
): TGetBurgerIngredientsActionSuccess => {
  return { type: GET_BURGER_INGREDIENTS_SUCCESS, payload: data };
};

const getBurgerIngredientsError = (): TGetBurgerIngredientsActionError => {
  return { type: GET_BURGER_INGREDIENTS_ERROR };
};

export const getBurgerIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getBurgerIngredientsRequest());
    fetch(`${BASE_API_URL}/ingredients`)
      .then((res) => {
        if (res.ok) return res.json();
        else dispatch(getBurgerIngredientsError());
      })
      .then((res) => dispatch(getBurgerIngredientsSuccess(res.data)))
      .catch(() => dispatch(getBurgerIngredientsError()));
  };
};
