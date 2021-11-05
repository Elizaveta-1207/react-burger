import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={`${appHeader.header} p-4`}>
      <div className={`${appHeader.container}`}>
        <div className={`${appHeader.nav}`}>
          <div className={`${appHeader.navBtn} mr-2`}>
            <BurgerIcon type='primary' />
            <p className={`text text_type_main-default pl-2 mr-5`}>Конструктор</p>
          </div>
          <div className={`${appHeader.navBtn} ml-5`}>
            <ListIcon type='secondary' />
            <p className={`text text_type_main-default text_color_inactive pl-2 mr-5`}>
              Лента заказов
            </p>
          </div>
        </div>
        <Logo />
        <div className={`${appHeader.navBtn} ml-5`}>
          <ProfileIcon type='secondary' />
          <p className={`text text_type_main-default text_color_inactive pl-2`}>Личный кабинет</p>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
