import { ADD_INGREDIENT_INFO, CLEAR_INGREDIENT_INFO } from '../actions/ingredient';

const initialState = {
  ingredient: null,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_INFO: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    case CLEAR_INGREDIENT_INFO: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
