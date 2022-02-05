import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import app from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { getBurgerIngredients } from '../../services/actions/burgerIngredients';
import { clearOrder } from '../../services/actions/order';

import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import Feed from '../../pages/Feed/Feed';
import FeedDetails from '../../pages/FeedDetails/FeedDetails';

import { GET_USER_FAILED, getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/constants';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

export const App = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<string | null>(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalType === 'order') {
      dispatch(clearOrder());
      setModalType(null);
    }
    if (location.state?.backIngredient) history.replace(location.state?.backIngredient);
    if (location.state?.backFeed) history.replace(location.state?.backFeed);
    if (location.state?.backProfile) history.replace(location.state?.backProfile);
  };

  const handleOpenModalOrder = useCallback(() => {
    setModalType('order');
    handleOpenModal();
  }, []);

  React.useEffect(() => {
    if (getCookie('accessToken')) dispatch(getUser());
    else dispatch({ type: GET_USER_FAILED });
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <>
      {showModal && modalType === 'order' && (
        <Modal onModalClose={handleCloseModal} modalType={modalType}>
          <OrderDetails />
        </Modal>
      )}
      <AppHeader />
      <Switch
        location={
          location.state?.backIngredient ??
          location.state?.backFeed ??
          location.state?.backProfile ??
          location
        }
      >
        <Route path='/' exact>
          <main className={`${app.main} pl-4 pr-4 mb-8`}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
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
        <Route path='/ingredients/:id'>
          <IngredientDetails />
        </Route>
        <Route path='/feed' exact>
          <Feed />
        </Route>
        <Route path='/feed/:id'>
          <FeedDetails />
        </Route>
        <Route path='/profile/orders/:id'>
          <FeedDetails />
        </Route>
      </Switch>

      {location.state?.backIngredient && (
        <Route path='/ingredients/:id'>
          <Modal
            onModalClose={handleCloseModal}
            modalType={'ingredient'}
            title={'Детали ингредиента'}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      )}

      {location.state?.backFeed && (
        <Route path='/feed/:id'>
          <Modal onModalClose={handleCloseModal} modalType={'order'}>
            <FeedDetails />
          </Modal>
        </Route>
      )}

      {location.state?.backProfile && (
        <Route path='/profile/orders/:id'>
          <Modal onModalClose={handleCloseModal} modalType={'order'}>
            <FeedDetails />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
