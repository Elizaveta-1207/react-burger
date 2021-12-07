export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';

export const addConstructorIngredient = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CONSTRUCTOR_INGREDIENT,
      payload: item,
    });
  };
};

export const deleteConstructorIngredient = (key) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      payload: key,
    });
  };
};
