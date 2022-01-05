import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from '../actions/burgerIngredients';

const initialState = {
  ingredients: [],
  isIngredientsLoading: false,
  isIngredientsGetFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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
