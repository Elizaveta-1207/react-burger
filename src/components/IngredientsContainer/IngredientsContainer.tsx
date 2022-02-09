import React from 'react';
import ingredientsContainer from './IngredientsContainer.module.css';
import Ingredient from '../Ingredient/Ingredient';
import { TIngredientType } from '../../utils/types';

type TIngredientsContainer = {
  ingredients: TIngredientType[];
  title: string;
};

function IngredientsContainer({ title, ingredients }: TIngredientsContainer) {
  return (
    <div className={`mb-10`}>
      <p className={`text text_type_main-medium mb-6`}>{title}</p>
      <div className={`${ingredientsContainer.container} pl-4 pr-4`}>
        {ingredients.map((item) => (
          <Ingredient
            // key={item.key}
            key={item._id}
            _id={item._id}
            type={item.type}
            image={item.image}
            price={item.price}
            name={item.name}
            proteins={item.proteins}
            fat={item.fat}
            carbohydrates={item.carbohydrates}
            calories={item.calories}
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientsContainer;
