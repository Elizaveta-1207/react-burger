import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer,
});
