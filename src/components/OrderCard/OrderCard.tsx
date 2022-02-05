import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import orderCard from './OrderCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderCard(props: { id: string }) {
  const history = useHistory();
  const location = useLocation<any>();
  const handleClick = () => {
    if (location.pathname === '/feed')
      history.replace({ pathname: `/feed/${props.id}`, state: { backgroundForFeed: location } });
    if (location.pathname === '/profile/orders')
      history.replace({
        pathname: `/profile/orders/${props.id}`,
        state: { backgroundForProfile: location },
      });
  };

  return (
    <div className={`${orderCard.card}`} onClick={handleClick}>
      <div className={`${orderCard.orderAndDate} mb-6`}>
        <p className='text text_type_digits-default'>#034535</p>
        <p className='text text_type_main-small text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className='text text_type_main-medium mb-6'>Death Star Starship Main бургер</p>
      <div className={orderCard.details}>
        {/* <img src={img} alt='img' /> */}
        <div className={orderCard.price}>
          <p className='text text_type_digits-default mr-1'>480</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
