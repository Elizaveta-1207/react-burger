import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css';

function BurgerConstructor({ data, onModalOpen, getModalType }) {
  const buns = data.filter((item) => item.type === 'bun');
  const handleClick = () => {
    getModalType();
    onModalOpen();
  };
  const showSum = () => {
    let sum = buns[0].price * 2;
    data.forEach((item) => {
      if (item.type !== 'bun') sum += item.price;
    });
    return sum;
  };
  return (
    <div className={`${burgerConstructor.container} pt-25 pl-4`}>
      <div className={`${burgerConstructor.ingredients} mb-10 `}>
        <div className={`${burgerConstructor.elem} ml-8`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
            className={`ml-8`}
          />
        </div>
        <div className={`${burgerConstructor.list}`}>
          {data.map(
            (item, i) =>
              item.type !== 'bun' && (
                <div className={`${burgerConstructor.elem}`}>
                  <div className={`${burgerConstructor.drag} mr-2`}>
                    <DragIcon type='primary' />
                  </div>
                  <ConstructorElement
                    key={item._id}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              ),
          )}
        </div>
        <div className={`${burgerConstructor.elem} ml-8`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
      </div>
      <div className={`${burgerConstructor.sumBlock} mr-4`}>
        <div className={`${burgerConstructor.sum} mr-10`}>
          <p className={`text text_type_digits-medium mr-2 ${burgerConstructor.sumValue}`}>
            {showSum()}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='large' onClick={handleClick}>
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
