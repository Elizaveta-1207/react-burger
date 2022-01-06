import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route, useHistory } from 'react-router-dom';
import app from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { getBurgerIngredients } from '../../services/actions/burgerIngredients';
import { clearOrder } from '../../services/actions/order';
import { clearIngredientInfo } from '../../services/actions/ingredient';

import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import { GET_USER_FAILED, getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/constants';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import { BASE_API_URL } from '../../utils/constants';

// export const BASE_API_URL = 'https://norma.nomoreparties.space/api';

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState();

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearOrder());
    dispatch(clearIngredientInfo());
  };

  React.useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const handleOpenModalIngredients = useCallback(() => {
    setModalType('ingredient');
    handleOpenModal();
  }, []);

  const handleOpenModalOrder = useCallback(() => {
    setModalType('order');
    handleOpenModal();
  }, []);

  React.useEffect(() => {
    if (getCookie('accessToken')) dispatch(getUser());
    else dispatch({ type: GET_USER_FAILED });
    dispatch(getBurgerIngredients());
  }, []);

  return (
    <>
      {showModal && (
        <Modal onModalClose={handleCloseModal} modalType={modalType}>
          {modalType === 'ingredient' ? <IngredientDetails /> : <OrderDetails />}
        </Modal>
      )}
      <AppHeader />
      <Switch>
        <Route path='/' exact>
          <main className={`${app.main} pl-4 pr-4 mb-8`}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients onModalOpen={handleOpenModalIngredients} />
              <BurgerConstructor onModalOpen={handleOpenModalOrder} />
            </DndProvider>
          </main>
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/forgot-password' exact>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password' exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path='/profile'>
          <Profile />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
