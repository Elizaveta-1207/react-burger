import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';

function AppHeader() {
  const { pathname } = useLocation<any>();
  return (
    <header className={`${appHeader.header} p-4`}>
      <div className={`${appHeader.container}`}>
        <nav className={`${appHeader.nav}`}>
          <NavLink exact to='/' className={`${appHeader.navBtn} mr-2`}>
            <BurgerIcon type={`${pathname === '/' ? 'primary' : 'secondary'}`} />
            <p
              className={`text text_type_main-default pl-2 mr-5 ${
                pathname === '/' ? '' : 'text_color_inactive'
              }`}
            >
              Конструктор
            </p>
          </NavLink>
          <NavLink to='/feed' className={`${appHeader.navBtn} ml-5`}>
            <ListIcon type={`${pathname === '/feed' ? 'primary' : 'secondary'}`} />
            <p
              className={`text text_type_main-default pl-2 mr-5 ${
                pathname === '/feed' ? '' : 'text_color_inactive'
              }`}
            >
              Лента заказов
            </p>
          </NavLink>
        </nav>
        <Link to='/'>
          <Logo />
        </Link>

        <NavLink to='/profile' className={`${appHeader.navBtn} ml-5`}>
          <ProfileIcon type={`${pathname === '/profile' ? 'primary' : 'secondary'}`} />
          <p
            className={`text text_type_main-default pl-2 ${
              pathname === '/profile' ? '' : 'text_color_inactive'
            }`}
          >
            Личный кабинет
          </p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
