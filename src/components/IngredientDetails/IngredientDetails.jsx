import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ingredientDetails from './IngredientDetails.module.css';

function IngredientDetails() {
  const { name, image, calories, proteins, fat, carbohydrates } = useSelector(
    (state) => state.ingredient.ingredient,
  );

  return (
    <div className={`${ingredientDetails.container} pb-15`}>
      <img src={image} alt='ingredient-icon' className={ingredientDetails.image} />
      <p className={`text text_type_main-medium mt-4`} style={{ textAlign: 'center' }}>
        {name}
      </p>
      <div className={`${ingredientDetails.details} mt-8`}>
        <div className={`${ingredientDetails.detail} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
        </div>
        <div className={`${ingredientDetails.detail} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
        </div>
        <div className={`${ingredientDetails.detail} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
        </div>
        <div className={ingredientDetails.detail}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}
IngredientDetails.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
};

export default IngredientDetails;
