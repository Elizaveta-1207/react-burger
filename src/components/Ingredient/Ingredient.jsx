import React from 'react';
import PropTypes from 'prop-types';
import ingredient from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient({ image, price, name, proteins, fat, carbohydrates, calories }) {
  return (
    <div className={`${ingredient.container} mb-8`}>
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
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
};

export default Ingredient;
