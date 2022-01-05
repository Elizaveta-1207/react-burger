import React from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import resetPassword from './ResetPassword.module.css';
import { BASE_API_URL } from '../../utils/constants';

function ResetPassword() {
  const history = useHistory();
  const location = useLocation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChange = (e) => {
    const target = e.target;
    target.name === 'code' ? setCode(target.value) : setPassword(target.value);
  };

  const onIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordOverlayClick = (e) => {
    if (!showPassword && e.currentTarget.classList.value !== 'input__icon input__icon-action')
      setShowPassword(!showPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_API_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ password: password, token: code }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else alert('ERROR');
      })
      .then((res) => {
        if (res.success) history.replace('/login', { forgotPageVisited: false });
        else alert('ERROR');
      })
      .catch((err) => alert(err));
  };

  return (
    <div onClick={handlePasswordOverlayClick}>
      <div className={resetPassword.block}>
        <form onSubmit={onSubmit} noValidate className={resetPassword.form}>
          <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
          <Input
            type={showPassword ? 'password' : 'text'}
            placeholder='Введите новый пароль'
            name='password'
            value={password || ''}
            icon={showPassword ? 'HideIcon' : 'ShowIcon'}
            onChange={onChange}
            onIconClick={onIconClick}
          />
          <Input
            type='text'
            placeholder='Введите код из письма'
            name='code'
            value={code || ''}
            onChange={onChange}
          />
          <Button type='primary' size='medium' disabled={!password || !code}>
            Восстановить
          </Button>
        </form>
        <div className={resetPassword.info}>
          <div className='text text_type_main-default text_color_inactive'>
            <span>Вспомнили пароль?</span>
            <Link to='/login' className={`${resetPassword.link} ml-2`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
