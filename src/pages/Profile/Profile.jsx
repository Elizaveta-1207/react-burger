import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import profile from './Profile.module.css';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('123456');

  const onChange = (e) => {
    const target = e.target;
    target.name === 'email'
      ? setEmail(target.value)
      : target.name === 'name'
      ? setName(target.value)
      : setPassword(target.value);
  };

  const cancelClick = (e) => {
    e.preventDefault();
    setPassword('123456');
  };

  const exitClick = () => {
    console.log(123);
    history.replace('/login');
  };

  const saveUserInfo = (e) => {
    e.preventDefault();
    console.log(1234);
  };

  return (
    <div className={profile.block}>
      <div className={`${profile.nav}`}>
        <nav className={profile.navBar}>
          <NavLink
            exact
            to='/profile'
            className={`text text_type_main-medium text_color_inactive ${profile.navLink} pt-4 pb-4`}
            activeClassName={profile.activeNavLink}
          >
            Профиль
          </NavLink>
          <NavLink
            to='/profile/orders'
            className={`text text_type_main-medium text_color_inactive ${profile.navLink} pt-4 pb-4`}
            activeClassName={profile.activeNavLink}
          >
            История заказов
          </NavLink>
          <NavLink
            to='/profile/exit'
            className={`text text_type_main-medium text_color_inactive ${profile.navLink} pt-4 pb-4`}
            activeClassName={profile.activeNavLink}
            onClick={exitClick}
          >
            Выход
          </NavLink>
        </nav>
        <p className={`text text_type_main-small text_color_inactive ${profile.navText}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <div className={profile.profileBlock}>
          <Input placeholder='Имя' name='name' value={name} onChange={onChange} icon={'EditIcon'} />
          <Input
            placeholder='Логин'
            name='email'
            value={email}
            onChange={onChange}
            icon={'EditIcon'}
          />
          <Input
            placeholder='Пароль'
            name='password'
            value={password}
            onChange={onChange}
            icon={'EditIcon'}
            type='password'
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button size='medium' type='secondary' onClick={cancelClick}>
              Отмена
            </Button>
            <Button size='medium' type='primary' onClick={saveUserInfo}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
