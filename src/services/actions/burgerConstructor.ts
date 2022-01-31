import { TIngredientType } from '../../utils/types';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const INCREASE_CONSTRUCTOR_AMOUNT = 'INCREASE_CONSTRUCTOR_AMOUNT';
export const DECREASE_CONSTRUCTOR_AMOUNT = 'DECREASE_CONSTRUCTOR_AMOUNT';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const MOVE_CONSTRUCTOR_INGREDIENTS = 'MOVE_CONSTRUCTOR_INGREDIENTS';

type TAddConstructorIngredientAction = { readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT; readonly payload: TIngredientType };
type TDeleteConstructorIngredientAction = { readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT; readonly payload: number|undefined };
type TIncreaseConstructorAmountAction = { readonly type: typeof INCREASE_CONSTRUCTOR_AMOUNT };
type TDecreaseConstructorAmountAction = { readonly type: typeof DECREASE_CONSTRUCTOR_AMOUNT };
type TAddConstructorBunAction = { readonly type: typeof ADD_CONSTRUCTOR_BUN; readonly payload: TIngredientType };
type TMoveConstructorIngredientsAction = {
	readonly type: typeof MOVE_CONSTRUCTOR_INGREDIENTS;
	readonly payload: { dragIndex: number; hoverIndex: number };
  };

  export type TBurgerConstructorActions =
  | TAddConstructorIngredientAction
  | TDeleteConstructorIngredientAction
  | TIncreaseConstructorAmountAction
  | TDecreaseConstructorAmountAction  
  | TAddConstructorBunAction
  | TMoveConstructorIngredientsAction;

export const addConstructorIngredient = (item: TIngredientType) :TAddConstructorIngredientAction => {
    const uniqueId = Math.trunc(Math.random() * 100000000);
    item.key = uniqueId;
    return({
      type: ADD_CONSTRUCTOR_INGREDIENT,
      payload: item,
    });
  };

export const deleteConstructorIngredient = (key:  number|undefined): TDeleteConstructorIngredientAction => {
	return { type: DELETE_CONSTRUCTOR_INGREDIENT, payload: key };
  };

export const increaseConstructorAmount = (): TIncreaseConstructorAmountAction => {
	return { type: INCREASE_CONSTRUCTOR_AMOUNT };
  };

export const decreaseConstructorAmount = (): TDecreaseConstructorAmountAction => {
	return { type: DECREASE_CONSTRUCTOR_AMOUNT };
  };

export const addConstructorBun = (item: TIngredientType): TAddConstructorBunAction => {
  const uniqueId = Math.trunc(Math.random() * 100000000);
  item.key = uniqueId;
  return {

      type: ADD_CONSTRUCTOR_BUN,
      payload: item,

  };
};

export const moveConstructorIngredients = (dragIndex: number, hoverIndex: number): TMoveConstructorIngredientsAction => {
    return({
      type: MOVE_CONSTRUCTOR_INGREDIENTS,
      payload: { dragIndex, hoverIndex },
    });

};
