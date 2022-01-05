import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import ingredient from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientInfo } from '../../services/actions/ingredient';
import Counter from '../Counter/Counter';

function Ingredient({
  _id,
  type,
  image,
  price,
  name,
  proteins,
  fat,
  carbohydrates,
  calories,
  onModalOpen,
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addIngredientInfo({ image, name, proteins, fat, carbohydrates, calories }));
    onModalOpen();
  };

  const { constructorBuns, constructorIngredients } = useSelector(
    (state) => state.burgerConstructor,
  );

  const dataIngredients = useSelector((state) => state.burgerIngredients.ingredients);
  const buns = dataIngredients.filter((item) => item.type === 'bun');

  const ingredientAmount = useMemo(() => {
    let amount = 0;
    constructorIngredients.forEach((item) => {
      if (item._id === _id) amount = amount + 1;
    });
    return amount;
  }, [constructorIngredients, _id]);

  const bunsAmount = useMemo(() => {
    if (constructorBuns || constructorIngredients.length > 0) {
      if (constructorBuns) {
        return constructorBuns._id === _id && 2;
      } else {
        return buns[0]._id === _id && 2;
      }
    } else {
      return;
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

Ingredient.propTypes = {
  _id: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
};

export default Ingredient;
