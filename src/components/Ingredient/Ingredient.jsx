import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import ingredient from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientInfo } from '../../services/actions/ingredient';

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
  getModalType,
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(type);
    dispatch(addIngredientInfo({ image, name, proteins, fat, carbohydrates, calories }));
    getModalType();
    onModalOpen();
  };

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
