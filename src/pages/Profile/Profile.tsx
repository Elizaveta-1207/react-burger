import React, { ChangeEvent } from 'react';
import { NavLink, useHistory, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import profile from './Profile.module.css';
import { updateUser, logout } from '../../services/actions/user';
import { RootState } from '../../services/reducers';
import { TAuthType } from '../../utils/types';
import OrderCard from '../../components/OrderCard/OrderCard';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/types';
import { getCookie, WS_URL } from '../../utils/constants';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const accessToken = getCookie('accessToken');
  const { orders } = useSelector((state) => state.orders);

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('54321L');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target.name === 'email'
      ? setEmail(target.value)
      : target.name === 'name'
      ? setName(target.value)
      : setPassword(target.value);
  };

  const cancelClick = () => {
    setEmail(user.user!.email);
    setName(user.user!.name);
    setPassword('54321L');
  };

  const exitClick = () => {
    dispatch(logout());
    history.replace('/login');
  };

  const saveUserInfo = () => {
    if (email !== user.user!.email || name !== user.user!.name)
      dispatch(updateUser({ email: email, name: name, password: password }));
  };

  React.useEffect(() => {
    setEmail(user.user!.email);
    setName(user.user!.name);
  }, [user.user]);

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL}/all?token=${accessToken}` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [accessToken, dispatch]);

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
      <Switch>
        <Route path='/profile' exact>
          <div>
            <div className={profile.profileBlock}>
              <Input
                placeholder='Имя'
                name='name'
                value={name}
                onChange={onChange}
                icon={'EditIcon'}
              />
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
        </Route>
        <Route path='/profile/orders'>
          <div className={`${profile.ordersBlock}`}>
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
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;
