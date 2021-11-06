import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css';
import ConstructorIngredient from '../ConstructorIngredient/ConstructorIngredient';

function BurgerConstructor({ data }) {
  const buns = data.filter((item) => item.type === 'bun');
  const showSum = () => {
    let sum = buns[0].price * 2;
    data.forEach((item) => {
      if (item.type !== 'bun') sum += item.price;
    });
    return sum;
  };
  return (
    <div className={`${burgerConstructor.container} pt-25 pl-4`}>
      <div className={`${burgerConstructor.ingredients} mb-10`}>
        <ConstructorIngredient
          image={buns[0].image}
          name={buns[0].name}
          price={buns[0].price}
          bun='top'
        />
        <div className={`${burgerConstructor.list}`}>
          {data.map(
            (item, i) =>
              item.type !== 'bun' && (
                <ConstructorIngredient
                  key={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  last={i === data.length - buns.length}
                />
              ),
          )}
        </div>
        <ConstructorIngredient
          image={buns[0].image}
          name={buns[0].name}
          price={buns[0].price}
          bun='bottom'
        />
      </div>
      <div className={`${burgerConstructor.sumBlock} mr-4`}>
        <div className={`${burgerConstructor.sum} mr-10`}>
          <p className={`text text_type_digits-medium mr-2 ${burgerConstructor.sumValue}`}>
            {showSum()}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
};
export default BurgerConstructor;
