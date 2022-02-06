import React, { useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import orderCard from './OrderCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder } from '../../utils/types';
import { useSelector } from '../../services/hooks';
import { getDate } from '../../utils/constants';
import { TIngredientType } from '../../utils/types';
import { relative } from 'path';

function OrderCard(props: TOrder) {
  const history = useHistory();
  const location = useLocation<any>();
  const { ingredients } = useSelector((state) => state.burgerIngredients);

  const orderSum = useMemo(() => {
    let sum = 0;
    const prop = props.ingredients;
    ingredients!.forEach((item) => {
      for (let i = 0; i < prop.length; i++) {
        if (item._id === prop[i]) sum += item.price;
      }
    });
    return sum;
  }, [ingredients, props.ingredients]);

  const handleClick = () => {
    if (location.pathname === '/feed')
      history.replace({ pathname: `/feed/${props._id}`, state: { backFeed: location } });
    if (location.pathname === '/profile/orders')
      history.replace({
        pathname: `/profile/orders/${props._id}`,
        state: { backProfile: location },
      });
  };

  const ingredientsInfo = (ingredientsOrder: Array<string> | null) => {
    let result: Array<any> = [];
    ingredients?.map((item) => {
      ingredientsOrder!.forEach((element) => {
        if (element === item._id) result.unshift(item.image_mobile);
      });
    });

    return result;
  };

  const ingredientsInOrder = ingredientsInfo(props.ingredients);
  const uniqueIngredientsInOrder = ingredientsInOrder?.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
  }, []);

  const slicedIngredients = uniqueIngredientsInOrder.reverse().slice(0, 6).reverse();

  console.log(slicedIngredients.length);
  console.log(uniqueIngredientsInOrder.length);

  return (
    <div className={`${orderCard.card}`} onClick={handleClick}>
      <div className={`${orderCard.orderAndDate} mb-6`}>
        <p className='text text_type_digits-default'>{`#${props.number}`}</p>
        <p className='text text_type_main-small text_color_inactive'>{getDate(props.createdAt)}</p>
      </div>
      <p className='text text_type_main-medium mb-6'> {props.name}</p>
      <div
        className={orderCard.details}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div className={orderCard.imgBlock}>
          {slicedIngredients.map((item: string, i: number) =>
            uniqueIngredientsInOrder.length - slicedIngredients.length === 0 ? (
              <img
                src={`${item}`}
                alt='feed'
                className={orderCard.img}
                style={{ marginRight: i !== 0 ? '-16px' : '0' }}
              />
            ) : (
              <div style={{ position: 'relative' }}>
                <img
                  src={`${item}`}
                  alt='feed'
                  className={orderCard.img}
                  style={{ marginRight: i !== 0 ? '-16px' : '0' }}
                />
                <div className={`${i === 0 ? orderCard.extra : ''} text text_type_main-default`}>
                  {i === 0 && '+' + (uniqueIngredientsInOrder.length - slicedIngredients.length)}
                </div>
              </div>
            ),
          )}
        </div>

        <div className={orderCard.price}>
          <p className='text text_type_digits-default mr-1'>{orderSum}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
