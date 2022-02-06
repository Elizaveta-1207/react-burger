import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from 'react-redux';
import { RootState, AppThunk, AppDispatch } from './reducers';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
