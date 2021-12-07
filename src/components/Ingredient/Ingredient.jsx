import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ingredient from './Ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientInfo } from '../../services/actions/ingredient';

function Ingredient({
  image,
  price,
  name,
  proteins,
  fat,
  carbohydrates,
  calories,
  onModalOpen,
  //   getIngredients,
  getModalType,
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    // getIngredients({ image, name, proteins, fat, carbohydrates, calories });

    dispatch(addIngredientInfo({ image, name, proteins, fat, carbohydrates, calories }));
    getModalType();
    onModalOpen();
  };
  return (
    <div className={`${ingredient.container} mb-8`} onClick={handleClick}>
      <img src={image} alt='burger-ingredient' className={`${ingredient.image} pl-4 pr-4`} />
      <div className={`${ingredient.price} mt-1`}>
        <p className={`text text_type_digits-default ${ingredient.priceValue}`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`text text_type_main-default ${ingredient.name} mt-1`}>{name}</p>
    </div>
  );
}
// Ingredient.propTypes = {
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   proteins: PropTypes.number,
//   fat: PropTypes.number,
//   carbohydrates: PropTypes.number,
//   calories: PropTypes.number,
// };

export default Ingredient;
