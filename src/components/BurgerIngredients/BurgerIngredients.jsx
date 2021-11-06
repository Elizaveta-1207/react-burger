import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredients from './BurgerIngredients.module.css';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';

function BurgerIngredients({ data }) {
  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const main = data.filter((item) => item.type === 'main');

  return (
    <div className={`${burgerIngredients.container} mr-10`}>
      <p className={`${burgerIngredients.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </p>
      <nav className={`${burgerIngredients.nav}`}>
        <p
          className={`${burgerIngredients.navBtn} ${burgerIngredients.navBtn_active} text text_type_main-default pt-4 pb-4`}
        >
          Булки
        </p>
        <p
          className={`${burgerIngredients.navBtn} text text_type_main-default text_color_inactive pt-4 pb-4`}
        >
          Соусы
        </p>
        <p
          className={`${burgerIngredients.navBtn} text text_type_main-default text_color_inactive pt-4 pb-4`}
        >
          Начинки
        </p>
      </nav>
      <div className={`${burgerIngredients.ingredientsBlock} mt-10`}>
        <IngredientsContainer title='Булки' ingredients={buns} />
        <IngredientsContainer title='Соусы' ingredients={sauces} />
        <IngredientsContainer title='Начинки' ingredients={main} />
      </div>
    </div>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.array,
};

export default BurgerIngredients;
