import {
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
} from '../actions/burgerConstructor';

const initialState = {
  constructorBuns: null,
  constructorIngredients: [],
  constructorSum: 0,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.payload],
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      const key = action.payload;
      const newConstructorIngredients = state.constructorIngredients.filter(
        (item) => item.key !== key,
      );
      return {
        ...state,
        constructorIngredients: newConstructorIngredients,
      };
    }
    default: {
      return state;
    }
  }
};
