import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from '../actions/burgerIngredients';
import { TIngredientType } from '../../utils/types';
import { TGetBurgerIngredientsActions } from '../actions/burgerIngredients';

type TInitialState = {
	ingredients: Array<TIngredientType> | null;
	isIngredientsLoading: boolean;
	isIngredientsGetFailed: boolean;
	isIngredientsLoaded: boolean;
  };

const initialState: TInitialState = {
  ingredients: [],
  isIngredientsLoading: false,
  isIngredientsGetFailed: false,
  isIngredientsLoaded: false,
};

export const burgerIngredientsReducer = (state = initialState, action: TGetBurgerIngredientsActions): TInitialState => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isIngredientsLoading: true,
      };
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        isIngredientsLoading: false,
        isIngredientsGetFailed: false,
        isIngredientsLoaded: true,
      };
    }
    case GET_BURGER_INGREDIENTS_ERROR: {
      return {
        ...initialState,
        isIngredientsLoading: false,
        isIngredientsGetFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
