import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_ERROR,
} from '../actions/burgerIngredients';
import { burgerIngredientsReducer } from './burgerIngredients';

describe('burgerIngredients reducer', () => {
  it('burgerIngredients reducer initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({
      ingredients: [],
      isIngredientsLoading: false,
      isIngredientsGetFailed: false,
      isIngredientsLoaded: false,
    });
  });

  it('GET_BURGER_INGREDIENTS_REQUEST', () => {
    expect(burgerIngredientsReducer(undefined, { type: GET_BURGER_INGREDIENTS_REQUEST })).toEqual({
      ingredients: [],
      isIngredientsLoading: true,
      isIngredientsGetFailed: false,
      isIngredientsLoaded: false,
    });
  });

  it('GET_BURGER_INGREDIENTS_SUCCESS', () => {
    expect(
      burgerIngredientsReducer(undefined, {
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        payload: [
          {
            _id: '60666c42cc7b410027a1a9b1',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
          },
        ],
      }),
    ).toEqual({
      ingredients: [
        {
          _id: '60666c42cc7b410027a1a9b1',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
        },
      ],
      isIngredientsLoading: false,
      isIngredientsGetFailed: false,
      isIngredientsLoaded: true,
    });
  });

  it('GET_BURGER_INGREDIENTS_ERROR', () => {
    expect(burgerIngredientsReducer(undefined, { type: GET_BURGER_INGREDIENTS_ERROR })).toEqual({
      ingredients: [],
      isIngredientsLoading: false,
      isIngredientsGetFailed: true,
      isIngredientsLoaded: false,
    });
  });
});
