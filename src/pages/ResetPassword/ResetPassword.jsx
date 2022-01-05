import React from 'react';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import resetPassword from './ResetPassword.module.css';

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
    console.log(12345);
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