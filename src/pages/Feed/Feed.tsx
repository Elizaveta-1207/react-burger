import React, { useEffect, useMemo } from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';
import { useSelector, useDispatch } from '../../services/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/types';
import { WS_URL } from '../../utils/constants';

import feed from './Feed.module.css';

function Feed() {
  const dispatch = useDispatch();
  const { total, totalToday, orders } = useSelector((state) => state.orders);

  const doneOrders = useMemo(() => {
    return orders.filter((item) => item.status === 'done').slice(0, 5);
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter((item) => item.status === 'pending').slice(0, 10);
  }, [orders]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL}/all` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <div className={`${feed.container}`}>
      <div className={`${feed.list} mr-10`}>
        <p className='text text_type_main-large mt-10 mb-5'>Лента заказов</p>
        <div className={`${feed.ordersBlock}`}>
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              _id={order._id}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
              status={order.status}
              number={order.number}
              name={order.name}
              ingredients={order.ingredients}
            />
          ))}
        </div>
      </div>
      <div className={`${feed.ordersInfo} pt-25`}>
        <div className={feed.ordersNumbers}>
          <div className={feed.ordersReady}>
            <p className='text text_type_main-medium mb-4'>Готовы:</p>
            <div>
              {doneOrders.map((item) => (
                <p
                  key={Math.random()}
                  className={`text text_type_digits-default ${feed.orderNumberReady} mt-2`}
                >
                  {item.number}
                </p>
              ))}
            </div>
          </div>
          <div className={feed.ordersInWork}>
            <p className='text text_type_main-medium mb-4'>В работе:</p>
            <div>
              {pendingOrders.map((item) => (
                <p key={Math.random()} className='text text_type_digits-default'>
                  {item.number}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
          <p className={`text text_type_digits-large ${feed.largeNumber}`}>{total}</p>
        </div>
        <div>
          <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large ${feed.largeNumber}`}>{totalToday}</p>
        </div>
      </div>
    </div>
  );
}

export default Feed;
