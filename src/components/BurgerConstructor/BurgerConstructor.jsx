import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
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
  const data = useSelector((state) => state.burgerIngredients.ingredients);
  const buns = data.filter((item) => item.type === 'bun');
  const bunsPrice = buns.length > 0 && buns[0].price * 2;
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

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (item) => {
      if (item.type === 'bun') dispatch(addConstructorBun(item));
      else dispatch(addConstructorIngredient(item));
      if (constructorBuns && item.type === 'bun') {
        dispatch(increaseConstructorSum());
        dispatch(decreaseConstructorSum());
      } else dispatch(increaseConstructorSum());
    },
  });

  return (
    <div className={`${burgerConstructor.container} pt-25 pl-4`}>
      <div
        ref={dropRef}
        style={{
          border: `${isHover ? '2px solid #4c4cff' : '2px solid transparent'}`,
          borderRadius: isHover && '10px',
          height: !constructorBuns && constructorIngredients.length === 0 && 'calc(100vh - 328px)',
        }}
      >
        {constructorBuns || constructorIngredients.length > 0 ? (
          <div className={`${burgerConstructor.ingredients}`}>
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
                // <p className='text text_type_main-medium'>Добавьте булку</p>
                <ConstructorElement
                  type='top'
                  isLocked={true}
                  text={`${buns[0].name} (верх) можно заменить`}
                  price={buns[0].price}
                  thumbnail={buns[0].image}
                  className={`ml-8`}
                />
              )}
            </div>
            <div className={`${burgerConstructor.list}`}>
              {constructorIngredients.map(
                (item, i) =>
                  item.type !== 'bun' && (
                    <div className={`${burgerConstructor.elem}`} key={i}>
                      <div className={`${burgerConstructor.drag} mr-2`}>
                        <DragIcon type='primary' />
                      </div>
                      <ConstructorElement
                        key={item._id}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={() => console.log(123)}
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
                // <p className='text text_type_main-medium'>Добавьте булку</p>
                <ConstructorElement
                  type='bottom'
                  isLocked={true}
                  text={`${buns[0].name} (низ) можно заменить`}
                  price={buns[0].price}
                  thumbnail={buns[0].image}
                  className={`ml-8`}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={`${burgerConstructor.empty}`}>
            <h2 className={`text text_type_main-large`}>Добавьте ингридиенты</h2>
          </div>
        )}
      </div>
      <div className={`${burgerConstructor.sumBlock} mr-4 mt-10`}>
        <div className={`${burgerConstructor.sum} mr-10`}>
          <p className={`text text_type_digits-medium mr-2 ${burgerConstructor.sumValue}`}>
            {/* {constructorBuns || constructorIngredients.length > 0 ? sum : bunsPrice} */}
            {constructorBuns || constructorIngredients.length > 0
              ? constructorBuns
                ? sum
                : sum + bunsPrice
              : 0}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <div className={`${!sum && burgerConstructor.btn_disabled} `}>
          <Button type='primary' size='large' onClick={handleClick} disabled={!sum}>
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
