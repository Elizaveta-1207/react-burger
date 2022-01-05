import {
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  ADD_CONSTRUCTOR_BUN,
  INCREASE_CONSTRUCTOR_AMOUNT,
  DECREASE_CONSTRUCTOR_AMOUNT,
  MOVE_CONSTRUCTOR_INGREDIENTS,
} from '../actions/burgerConstructor';

const initialState = {
  constructorBuns: null,
  constructorIngredients: [],
  constructorAmount: 0,
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
    case ADD_CONSTRUCTOR_BUN: {
      return {
        ...state,
        constructorBuns: action.payload,
      };
    }
    case INCREASE_CONSTRUCTOR_AMOUNT: {
      return {
        ...state,
        constructorAmount: state.constructorAmount + 1,
      };
    }
    case DECREASE_CONSTRUCTOR_AMOUNT: {
      return {
        ...state,
        constructorAmount: state.constructorAmount - 1,
      };
    }
    case MOVE_CONSTRUCTOR_INGREDIENTS: {
      const newConstructorIngredients = [...state.constructorIngredients];
      newConstructorIngredients.splice(
        action.payload.hoverIndex,
        0,
        newConstructorIngredients.splice(action.payload.dragIndex, 1)[0],
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
