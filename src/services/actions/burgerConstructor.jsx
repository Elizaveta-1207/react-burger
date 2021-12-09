export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const INCREASE_CONSTRUCTOR_SUM = 'INCREASE_CONSTRUCTOR_SUM';
export const DECREASE_CONSTRUCTOR_SUM = 'DECREASE_CONSTRUCTOR_SUM';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';

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

export const increaseConstructorSum = () => {
  return (dispatch) => {
    dispatch({
      type: INCREASE_CONSTRUCTOR_SUM,
    });
  };
};

export const decreaseConstructorSum = () => {
  return (dispatch) => {
    dispatch({
      type: DECREASE_CONSTRUCTOR_SUM,
    });
  };
};

export const addConstructorBun = (item) => {
  const uniqueKey = Math.random();
  item.key = uniqueKey;
  return (dispatch) => {
    dispatch({
      type: ADD_CONSTRUCTOR_BUN,
      payload: item,
    });
  };
};

export const updateConstructorIngredients = (dragIndex, hoverIndex) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CONSTRUCTOR_INGREDIENTS,
      payload: { dragIndex, hoverIndex },
    });
  };
};
