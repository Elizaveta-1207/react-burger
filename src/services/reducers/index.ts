import { combineReducers,Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { userReducer } from './user';
import { ordersReducer } from './orders';
import { store } from '../../index';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  orders: ordersReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, unknown, Action>>;
export type AppDispatch = typeof store.dispatch;