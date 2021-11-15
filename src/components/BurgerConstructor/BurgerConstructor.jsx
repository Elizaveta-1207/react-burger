import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css';

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
      <div className={`${burgerConstructor.ingredients} mb-10 pl-8`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={buns[0].name}
          price={buns[0].price}
          thumbnail={buns[0].image}
        />

        <div className={`${burgerConstructor.list}`}>
          {data.map(
            (item, i) =>
              item.type !== 'bun' && (
                <ConstructorElement
                  key={item._id}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              ),
          )}
        </div>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={buns[0].name}
          price={buns[0].price}
          thumbnail={buns[0].image}
          className={`${burgerConstructor.elem}`}
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
  data: PropTypes.array.isRequired,
};
export default BurgerConstructor;
