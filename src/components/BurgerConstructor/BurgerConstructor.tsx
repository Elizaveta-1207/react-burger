import React, { useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
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
  increaseConstructorAmount,
  decreaseConstructorAmount,
  addConstructorBun,
  deleteConstructorIngredient,
} from '../../services/actions/burgerConstructor';
import DraggableIngredient from '../DraggableIngredient/DraggableIngredient';
import { RootState } from '../../services/reducers';
import {
  TAuthType,
  TBurgerIngredientsType,
  TBurgerConstructorType,
  TIngredientType,
} from '../../utils/types';

type TBurgerConstructor = {
  onModalOpen: () => void;
};

function BurgerConstructor({ onModalOpen }: TBurgerConstructor) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth } = useSelector((state) => state.user);
  const dataIngredients = useSelector((state) => state.burgerIngredients.ingredients);
  const buns = useMemo(() => {
    return dataIngredients && dataIngredients.filter((item) => item.type === 'bun');
  }, [dataIngredients]);
  const bunsPrice = buns!.length > 0 ? buns![0].price * 2 : 0;
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

  const handleClickOrder = () => {
    if (!isAuth) return history.replace('/login');
    const ingredientsId = constructorIngredients.map((item) => item._id);
    constructorBuns
      ? dispatch(getOrder([...ingredientsId, constructorBuns._id]))
      : dispatch(getOrder([...ingredientsId, buns![0]._id]));
    onModalOpen();
  };

  const handleDeleteIngredient = (key: number | undefined | string) => {
    dispatch(deleteConstructorIngredient(key));
    dispatch(decreaseConstructorAmount());
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (item: TIngredientType) => {
      if (item.type === 'bun') dispatch(addConstructorBun(item));
      else dispatch(addConstructorIngredient(item));
      if (constructorBuns && item.type === 'bun') {
        dispatch(increaseConstructorAmount());
        dispatch(decreaseConstructorAmount());
      } else dispatch(increaseConstructorAmount());
    },
  });

  return (
    <div id='burgerConstructor-container' className={`${burgerConstructor.container} pt-25 pl-4`}>
      <div
        ref={dropRef}
        className={`${burgerConstructor.block} ${isHover && burgerConstructor.block_hovered}`}
      >
        {constructorBuns || constructorIngredients.length > 0 ? (
          <div className={`${burgerConstructor.ingredients}`}>
            <div className={`${burgerConstructor.elem} ml-8`}>
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${
                  constructorBuns ? constructorBuns.name : buns![0].name + ' ?????????? ????????????????'
                } (????????)`}
                price={constructorBuns ? constructorBuns.price : buns![0].price}
                thumbnail={`${constructorBuns ? constructorBuns.image : buns![0].image}`}
                // className={`ml-8`}
              />
            </div>
            <div className={`${burgerConstructor.list}`}>
              {constructorIngredients.map(
                (item, i) =>
                  item.type !== 'bun' && (
                    <DraggableIngredient key={item.key} index={i}>
                      <div className={`${burgerConstructor.elem}`}>
                        <div className={`${burgerConstructor.drag} mr-2`}>
                          <DragIcon type='primary' />
                        </div>
                        <ConstructorElement
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image !== undefined ? item.image : ''}
                          handleClose={() => handleDeleteIngredient(item.key)}
                        />
                      </div>
                    </DraggableIngredient>
                  ),
              )}
            </div>
            <div className={`${burgerConstructor.elem} ml-8`}>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${
                  constructorBuns ? constructorBuns.name : buns![0].name + ' ?????????? ????????????????'
                } (??????)`}
                price={constructorBuns ? constructorBuns.price : buns![0].price}
                thumbnail={`${constructorBuns ? constructorBuns.image : buns![0].image}`}
                // className={`ml-8`}
              />
            </div>
          </div>
        ) : (
          <div className={`${burgerConstructor.empty}`}>
            <h2 className={`text text_type_main-large`}>???????????????? ??????????????????????</h2>
          </div>
        )}
      </div>
      <div className={`${burgerConstructor.sumBlock} mr-4 mt-10`}>
        <div className={`${burgerConstructor.sum} mr-10`}>
          <p className={`text text_type_digits-medium mr-2 ${burgerConstructor.sumValue}`}>
            {constructorBuns || constructorIngredients.length > 0
              ? constructorBuns
                ? sum
                : sum + bunsPrice
              : 0}
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <div className={`${!sum && burgerConstructor.btn_disabled} `}>
          <Button type='primary' size='large' onClick={handleClickOrder} disabled={!sum}>
            ???????????????? ??????????
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BurgerConstructor;
