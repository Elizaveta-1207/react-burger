export const ADD_INGREDIENT_INFO = 'ADD_INGREDIENT_INFO';
export const CLEAR_INGREDIENT_INFO = 'CLEAR_INGREDIENT_INFO';

export const addIngredientInfo = (info) => {
  return (dispatch) => {
    dispatch({
      type: ADD_INGREDIENT_INFO,
      payload: info,
    });
  };
};

export const clearIngredientInfo = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_INGREDIENT_INFO,
    });
  };
};
