import React from 'react';
import PropTypes from 'prop-types';
import ingredientsContainer from './IngredientsContainer.module.css';
import Ingredient from '../Ingredient/Ingredient';

function IngredientsContainer({ title, ingredients, onModalOpen, getIngredients, getModalType }) {
  return (
    <div className={`mb-10`}>
      <p className={`text text_type_main-medium mb-6`}>{title}</p>
      <div className={`${ingredientsContainer.container} pl-4 pr-4`}>
        {ingredients.map((item) => (
          <Ingredient
            key={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
            proteins={item.proteins}
            fat={item.fat}
            carbohydrates={item.carbohydrates}
            calories={item.calories}
            onModalOpen={onModalOpen}
            getIngredients={getIngredients}
            getModalType={getModalType}
          />
        ))}
      </div>
    </div>
  );
}
IngredientsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
};
export default IngredientsContainer;
