import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css';
import { getOrder } from '../../services/actions/order';
import {
  addConstructorIngredient,
  increaseConstructorSum,
  decreaseConstructorSum,
  addConstructorBun,
} from '../../services/actions/burgerConstructor';

function BurgerConstructor({ onModalOpen, getModalType }) {
  const dispatch = useDispatch();
  const { constructorBuns, constructorIngredients } = useSelector(
    (state) => state.burgerConstructor,
  );
  const sum = useMemo(() => {
    let fullPrice = 0;
    constructorIngredients.forEach((item) => {
      if (item.type !== 'bun') fullPrice += item.price;
    });
    return constructorBuns ? fullPrice + 2 * constructorBuns.price : fullPrice;
  }, [constructorBuns, constructorIngredients]);

  //   const buns = data.filter((item) => item.type === 'bun');
  const handleClick = () => {
    const ingredientsId = constructorIngredients.map((item) => item._id);
    dispatch(getOrder([...ingredientsId, constructorBuns._id]));
    getModalType();
    onModalOpen();
  };
  //   const showSum = () => {
  //     let sum = buns[0].price * 2;
  //     data.forEach((item) => {
  //       if (item.type !== 'bun') sum += item.price;
  //     });
  //     return sum;
  //   };
  return (
    <div className={`${burgerConstructor.container} pt-25 pl-4`}>
      {constructorBuns || constructorIngredients.length > 0 ? (
        <div className={`${burgerConstructor.ingredients} mb-10 `}>
          <div className={`${burgerConstructor.elem} ml-8`}>
            {constructorBuns ? (
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${constructorBuns.name} (верх)`}
                price={constructorBuns.price}
                thumbnail={constructorBuns.image}
                className={`ml-8`}
              />
            ) : (
              <p className='text text_type_main-medium'>Добавьте булку</p>
            )}
          </div>
          <div className={`${burgerConstructor.list}`}>
            {constructorIngredients.map(
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
            {constructorBuns ? (
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${constructorBuns.name} (низ)`}
                price={constructorBuns.price}
                thumbnail={constructorBuns.image}
              />
            ) : (
              <p className='text text_type_main-medium'>Добавьте булку</p>
            )}
          </div>
        </div>
      ) : (
        <div className={`${burgerConstructor.empty}`}>
          <h2 className={`text text_type_main-large`}>Добавьте ингридиенты</h2>
        </div>
      )}
      <div className={`${burgerConstructor.sumBlock} mr-4`}>
        <div className={`${burgerConstructor.sum} mr-10`}>
          <p className={`text text_type_digits-medium mr-2 ${burgerConstructor.sumValue}`}>
            {constructorBuns || constructorIngredients.length > 0 ? sum : 0}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <div className={`${!constructorBuns && burgerConstructor.btn_disabled}`}>
          <Button type='primary' size='large' onClick={handleClick} disabled={!constructorBuns}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.array.isRequired,
// };
export default BurgerConstructor;
