export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const INCREASE_CONSTRUCTOR_AMOUNT = 'INCREASE_CONSTRUCTOR_AMOUNT';
export const DECREASE_CONSTRUCTOR_AMOUNT = 'DECREASE_CONSTRUCTOR_AMOUNT';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const MOVE_CONSTRUCTOR_INGREDIENTS = 'MOVE_CONSTRUCTOR_INGREDIENTS';

export const addConstructorIngredient = (item) => {
  return (dispatch) => {
    const uniqueId = Math.trunc(Math.random() * 100000000);
    item.key = uniqueId;
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

export const increaseConstructorAmount = () => {
  return (dispatch) => {
    dispatch({
      type: INCREASE_CONSTRUCTOR_AMOUNT,
    });
  };
};

export const decreaseConstructorAmount = () => {
  return (dispatch) => {
    dispatch({
      type: DECREASE_CONSTRUCTOR_AMOUNT,
    });
  };
};

export const addConstructorBun = (item) => {
  const uniqueId = Math.trunc(Math.random() * 100000000);
  item.key = uniqueId;
  return (dispatch) => {
    dispatch({
      type: ADD_CONSTRUCTOR_BUN,
      payload: item,
    });
  };
};

export const moveConstructorIngredients = (dragIndex, hoverIndex) => {
  return (dispatch) => {
    dispatch({
      type: MOVE_CONSTRUCTOR_INGREDIENTS,
      payload: { dragIndex, hoverIndex },
    });
  };
};
