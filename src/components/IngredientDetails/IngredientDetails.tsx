import React from 'react';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ingredientDetails from './IngredientDetails.module.css';
import { RootState } from '../../services/reducers';
import { TBurgerIngredientsType } from '../../utils/types';

function IngredientDetails() {
  const location = useLocation<any>();
  const { id } = useParams<{ id: string }>();

  const ingredientsData = useSelector(
    (state: Omit<RootState, 'burgerIngredients'> & { burgerIngredients: TBurgerIngredientsType }) =>
      state.burgerIngredients.ingredients,
  );
  const { isIngredientsLoaded } = useSelector(
    (state: Omit<RootState, 'burgerIngredients'> & { burgerIngredients: TBurgerIngredientsType }) =>
      state.burgerIngredients,
  );
  const currentIngredient = React.useMemo(() => {
    return ingredientsData.find((item) => item._id === id);
  }, [ingredientsData]);

  if (!isIngredientsLoaded) return null;
  else if (isIngredientsLoaded && !currentIngredient) return <Redirect to='/' />;

  return (
    <div
      className={`${ingredientDetails.container} pb-15`}
      style={{ height: `${!location.state?.fromSite && 'calc(100vh - 86px)'}` }}
    >
      <img
        src={currentIngredient?.image}
        alt='ingredient-icon'
        className={ingredientDetails.image}
      />
      <p className={`text text_type_main-medium mt-4`} style={{ textAlign: 'center' }}>
        {currentIngredient?.name}
      </p>
      <div className={`${ingredientDetails.details} mt-8`}>
        <div className={`${ingredientDetails.detail} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {currentIngredient?.calories}
          </p>
        </div>
        <div className={`${ingredientDetails.detail} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {currentIngredient?.proteins}
          </p>
        </div>
        <div className={`${ingredientDetails.detail} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {currentIngredient?.fat}
          </p>
        </div>
        <div className={ingredientDetails.detail}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {currentIngredient?.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
