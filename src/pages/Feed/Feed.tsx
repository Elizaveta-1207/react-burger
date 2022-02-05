import React, { useEffect, useMemo } from 'react';
import OrderCard from '../../components/OrderCard/OrderCard';

import feed from './Feed.module.css';

function Feed() {
  return (
    <div className={`${feed.container}`}>
      <div className={`${feed.list} mr-10`}>
        <p className='text text_type_main-large mt-10 mb-5'>Лента заказов</p>
        <div className={`${feed.ordersBlock}`}>
          <OrderCard id={'034535'} />
          <OrderCard id={'034535'} />
          <OrderCard id={'034535'} />
          <OrderCard id={'034535'} />
        </div>
      </div>
      <div className={`${feed.ordersInfo} pt-25`}>
        <div className={feed.ordersNumbers}>
          <div className={feed.ordersReady}>
            <p className='text text_type_main-medium mb-4'>Готовы:</p>
            <div>
              <p className={`text text_type_digits-default ${feed.orderNumberReady} mt-2`}>
                034533
              </p>
              <p className={`text text_type_digits-default ${feed.orderNumberReady}  mt-2`}>
                034533
              </p>
              <p className={`text text_type_digits-default ${feed.orderNumberReady} mt-2`}>
                034533
              </p>
              <p className={`text text_type_digits-default ${feed.orderNumberReady} mt-2`}>
                034533
              </p>
              <p className={`text text_type_digits-default ${feed.orderNumberReady} mt-2`}>
                034533
              </p>
            </div>
          </div>
          <div className={feed.ordersInWork}>
            <p className='text text_type_main-medium mb-4'>В работе:</p>
            <div>
              <p className='text text_type_digits-default mt-2'>034533</p>
              <p className='text text_type_digits-default mt-2'>034533</p>
              <p className='text text_type_digits-default mt-2'>034533</p>
            </div>
          </div>
        </div>
        <div>
          <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
          <p className={`text text_type_digits-large ${feed.largeNumber}`}>28 752</p>
        </div>
        <div>
          <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large ${feed.largeNumber}`}>138</p>
        </div>
      </div>
    </div>
  );
}

export default Feed;
