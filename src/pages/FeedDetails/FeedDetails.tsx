import React, { useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedDetails from './FeedDetails.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { getDate, WS_URL } from '../../utils/constants';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/types';
import { TIngredientType } from '../../utils/types';

function FeedDetails() {
  const location = useLocation<any>();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { ingredients } = useSelector((state) => state.burgerIngredients);

  const order = useMemo(() => {
    return orders.find((item) => item._id === id);
  }, [id, orders]);

  const ingredientsInfo = (ingredients: Array<TIngredientType> | null) => {
    let result: Array<TIngredientType> = [];
    order?.ingredients.map((item) => {
      ingredients!.forEach((element) => {
        if (element._id === item) result.push(element);
      });
    });
    return result;
  };

  const ingredientsInOrder = ingredientsInfo(ingredients);
  const orderPrice = useMemo(() => {
    let price: number = 0;
    ingredientsInOrder.forEach((item) => (price += item.price));
    return price;
  }, [ingredientsInOrder]);

  useEffect(() => {
    if (!location.state) dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL}/all` });
    return () => {
      if (!location.state) dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  if (!order) return null;

  return (
    <div
      className={`pb-10 pl-10 pr-10 ${feedDetails.container}`}
      style={{
        height: `${
          (!(location as any).state?.backFeed || !(location as any).state?.backProfile) &&
          'calc(100vh - 86px)'
        }`,
      }}
    >
      <p
        className='text text_type_digits-default mb-10'
        style={{ textAlign: 'center' }}
      >{`#${order?.number}`}</p>
      <div className='mb-15'>
        <p className='text text_type_main-medium mb-3'>{order?.name}</p>
        <p
          className='text text_type_main-small'
          style={{ color: order?.status === 'done' ? '#00CCCC' : '#CC0013' }}
        >
          {order?.status === 'done' ? 'Выполнен' : 'Отменен'}
        </p>
      </div>
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <div className={`${feedDetails.list} mb-10`}>
        {ingredientsInOrder.map((item) => (
          <div
            key={item._id + Math.random()}
            style={{
              width: '95%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className={`mb-4`}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.image_mobile} alt='feed' className={feedDetails.img} />
              <span className='text text_type_main-small'>{item.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>{item.price}</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        ))}
      </div>
      <div
        className={`${feedDetails.priceAndDate}`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <p className='text text_type_main-small text_color_inactive'>{getDate(order!.createdAt)}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className={`text text_type_main-medium mr-2`}>{orderPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}

export default FeedDetails;
