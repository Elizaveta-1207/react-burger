import {
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  ADD_CONSTRUCTOR_BUN,
  INCREASE_CONSTRUCTOR_AMOUNT,
  DECREASE_CONSTRUCTOR_AMOUNT,
  MOVE_CONSTRUCTOR_INGREDIENTS,
} from '../actions/burgerConstructor';
import { burgerConstructorReducer } from './burgerConstructor';

describe('burgerConstructor reducer', () => {
  it('burgerConstructor reducer initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual({
      constructorBuns: null,
      constructorIngredients: [],
      constructorAmount: 0,
    });
  });

  it('ADD_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        payload: { id: '1', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 3000 },
      }),
    ).toEqual({
      constructorBuns: null,
      constructorIngredients: [
        { id: '1', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 3000 },
      ],
      constructorAmount: 0,
    });
  });

  it('DELETE_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      burgerConstructorReducer(
        {
          constructorBuns: null,
          constructorIngredients: [
            { id: '1', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 3000, key: '1' },
            { id: '2', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 1000, key: '2' },
          ],
          constructorAmount: 0,
        },
        { type: DELETE_CONSTRUCTOR_INGREDIENT, payload: '2' },
      ),
    ).toEqual({
      constructorBuns: null,
      constructorIngredients: [
        { id: '1', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 3000, key: '1' },
      ],
      constructorAmount: 0,
    });
  });

  it('ADD_CONSTRUCTOR_BUN', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: ADD_CONSTRUCTOR_BUN,
        payload: { id: '3', name: 'Краторная булка N-200i', type: 'bun', price: 1255 },
      }),
    ).toEqual({
      constructorBuns: { id: '3', name: 'Краторная булка N-200i', type: 'bun', price: 1255 },
      constructorIngredients: [],
      constructorAmount: 0,
    });
  });

  it('INCREASE_CONSTRUCTOR_AMOUNT', () => {
    expect(burgerConstructorReducer(undefined, { type: INCREASE_CONSTRUCTOR_AMOUNT })).toEqual({
      constructorBuns: null,
      constructorIngredients: [],
      constructorAmount: 1,
    });
  });

  it('DECREASE_CONSTRUCTOR_AMOUNT', () => {
    expect(burgerConstructorReducer(undefined, { type: DECREASE_CONSTRUCTOR_AMOUNT })).toEqual({
      constructorBuns: null,
      constructorIngredients: [],
      constructorAmount: -1,
    });
  });

  it('MOVE_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      burgerConstructorReducer(
        {
          constructorBuns: null,
          constructorIngredients: [
            { id: '1', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 3000, key: '1' },
            { id: '2', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 3000, key: '2' },
          ],
          constructorAmount: 0,
        },
        { type: MOVE_CONSTRUCTOR_INGREDIENTS, payload: { hoverIndex: 0, dragIndex: 1 } },
      ),
    ).toEqual({
      constructorBuns: null,
      constructorIngredients: [
        { id: '2', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 3000, key: '2' },
        { id: '1', name: 'Говяжий метеорит (отбивная)', type: 'main', price: 3000, key: '1' },
      ],
      constructorAmount: 0,
    });
  });
});
