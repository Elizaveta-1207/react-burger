import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedDetails from './FeedDetails.module.css';

function FeedDetails() {
  const location = useLocation<any>();
  const { id } = useParams<{ id: string }>();
  return (
    <div
      className={`pb-10 pl-10 pr-10 ${feedDetails.container}`}
      style={{ height: `${!(location as any).state?.backFeed && 'calc(100vh - 86px)'}` }}
    >
      <div>
        <p
          className='text text_type_digits-default mb-10'
          style={{ textAlign: 'center' }}
        >{`#${id}`}</p>
        <div className='mb-15'>
          <p className='text text_type_main-medium mb-3'>Death Star Starship Main бургер</p>
          <p className='text text_type_main-small' style={{ color: '#00CCCC' }}>
            Выполнен
          </p>
        </div>
        <p className='text text_type_main-medium mb-6'>Состав:</p>
        <div className={`${feedDetails.list} mb-10`}>
          <div
            style={{
              width: '95%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className={`mb-4`}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='https://code.s3.yandex.net/react/code/bun-02.png'
                alt='feed'
                style={{ height: 64, width: 64, objectFit: 'cover', display: 'block' }}
              />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>

          <div
            style={{
              width: '95%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className={`mb-4`}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='https://code.s3.yandex.net/react/code/bun-02.png'
                alt='feed'
                style={{ height: 64, width: 64, objectFit: 'cover', display: 'block' }}
              />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className={`text text_type_main-medium mr-2`}>480</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>

          <div
            className={`mb-4`}
            style={{
              width: '95%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='https://code.s3.yandex.net/react/code/bun-02.png'
                alt='feed'
                style={{ height: 64, width: 64, objectFit: 'cover', display: 'block' }}
              />
              <span className='text text_type_main-small'>Краторная булка N-200i</span>
            </div>
          </div>
        </div>
        <div
          className={`${feedDetails.priceAndDate}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <p className='text text_type_main-small text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className={`text text_type_main-medium mr-2`}>480</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedDetails;
