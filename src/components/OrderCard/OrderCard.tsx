import React, { useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import orderCard from './OrderCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder } from '../../utils/types';
import { useSelector } from '../../services/hooks';
import { getDate } from '../../utils/constants';
import { TIngredientType } from '../../utils/types';

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
    let result: Array<string | undefined> = [];
    ingredients?.map((item) => {
      ingredientsOrder!.forEach((element) => {
        if (element === item._id) result.push(item.image_mobile);
      });
    });
    return result;
  };

  const ingredientsInOrder = ingredientsInfo(props.ingredients);

  console.log(props.ingredients);

  console.log(ingredientsInOrder);
  console.log(ingredients);

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
        <img
          src={`${ingredientsInOrder[0]}`}
          alt='feed'
          style={{ height: 64, width: 64, objectFit: 'cover', display: 'block' }}
        />
        <div className={orderCard.price}>
          <p className='text text_type_digits-default mr-1'>{orderSum}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
