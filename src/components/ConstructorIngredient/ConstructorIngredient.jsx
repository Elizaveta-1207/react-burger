import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  LockIcon,
  DeleteIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorIngredient from './ConstructorIngredient.module.css';

function ConstructorIngredient({ image, name, price, bun, last }) {
  console.log(last);
  return (
    <div
      className={`${
        bun === 'top' ? 'mb-4 pr-4' : bun === 'bottom' ? 'mt-4 pr-4' : last ? 'pr-2' : 'pr-2 mb-4'
      } `}
    >
      <div
        className={`${constructorIngredient.container}`}
        style={{
          justifyContent: bun && 'end',
        }}
      >
        {!bun && <DragIcon type='primary' />}
        <div
          className={`${constructorIngredient.slice} pt-4 pb-4 pl-6 pr-8`}
          style={{
            borderRadius:
              bun === 'top'
                ? '88px 88px 40px 40px'
                : bun === 'bottom'
                ? '40px 40px 88px 88px'
                : '40px',
          }}
        >
          <div className={constructorIngredient.ingredient}>
            <img alt='item-card' src={image} className={`${constructorIngredient.image} mr-5`} />
            <p className={`text text_type_main-default ${constructorIngredient.name}`}>
              {`${name} ${bun === 'top' ? '(верх)' : bun === 'bottom' ? '(низ)' : ''}`}
            </p>
          </div>
          <div className={constructorIngredient.values}>
            <div className={`${constructorIngredient.price} mr-5`}>
              <p className={`text text_type_digits-default ${constructorIngredient.priceValue}`}>
                {price}
              </p>
              <CurrencyIcon type='primary' />
            </div>
            {bun ? <LockIcon type='secondary' /> : <DeleteIcon type='primary' />}
          </div>
        </div>
      </div>
    </div>
  );
}

ConstructorIngredient.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  bun: PropTypes.string,
  last: PropTypes.bool,
};

export default ConstructorIngredient;
