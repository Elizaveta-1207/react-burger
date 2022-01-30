import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import ingredient from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Counter from '../Counter/Counter';
import { RootState } from '../../services/reducers';
import { TIngredientType, TBurgerConstructorType, TBurgerIngredientsType } from '../../utils/types';

function Ingredient({ _id, type, image, price, name }: TIngredientType) {
  const history = useHistory();
  const location = useLocation<any>();

  const handleClick = () => {
    history.replace({
      pathname: `/ingredients/${_id}`,
      state: { back: location },
    });
  };

  const { constructorBuns, constructorIngredients } = useSelector(
    (state: Omit<RootState, 'burgerConstructor'> & { burgerConstructor: TBurgerConstructorType }) =>
      state.burgerConstructor,
  );

  const dataIngredients = useSelector(
    (state: Omit<RootState, 'burgerIngredients'> & { burgerIngredients: TBurgerIngredientsType }) =>
      state.burgerIngredients.ingredients,
  );
  const buns = dataIngredients.filter((item) => item.type === 'bun');

  const ingredientAmount = useMemo(() => {
    let amount = 0;
    constructorIngredients.forEach((item) => {
      if (item._id === _id) amount = amount + 1;
    });
    return amount;
  }, [constructorIngredients, _id]);

  const bunsAmount = useMemo(() => {
    let amount = 0;
    if (constructorBuns || constructorIngredients.length > 0) {
      if (constructorBuns) {
        return constructorBuns._id === _id ? 2 : 0;
      } else {
        return buns[0]._id === _id ? 2 : 0;
      }
    } else {
      return amount;
    }
  }, [constructorBuns, constructorIngredients, buns, _id]);

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { _id: _id, name: name, type: type, image: image, price: price },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  return (
    <div
      className={`${ingredient.container} mb-8`}
      onClick={handleClick}
      ref={dragRef}
      style={{ opacity: `${opacity}` }}
    >
      <Counter amount={type === 'bun' ? bunsAmount : ingredientAmount} />
      <img src={image} alt='burger-ingredient' className={`${ingredient.image} pl-4 pr-4`} />
      <div className={`${ingredient.price} mt-1`}>
        <p className={`text text_type_digits-default ${ingredient.priceValue}`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`text text_type_main-default ${ingredient.name} mt-1`}>{name}</p>
    </div>
  );
}

export default Ingredient;
