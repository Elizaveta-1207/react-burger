import React from 'react';
import { useSelector } from 'react-redux';
import orderDetails from './OrderDetails.module.css';
import done from '../../images/done.gif';

function OrderDetails() {
  const orderNumber = useSelector((state) => state.order.orderNumber);
  return (
    <div className={`${orderDetails.container} pb-30`}>
      <h3 className={`text text_type_digits-large ${orderDetails.orderId}`}>{orderNumber}</h3>
      <p className={`text text_type_main-medium mt-8 ${orderDetails.orderIdText}`}>
        идентификатор заказа
      </p>
      <img src={done} alt='done-icon' className='mt-15' />
      <p className={`text text_type_main-default mt-15`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive mt-2`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
