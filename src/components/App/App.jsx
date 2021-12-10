import React from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
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

export const BASE_API_URL = 'https://norma.nomoreparties.space/api';

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
  }, []);

  return (
    <>
      {showModal && (
        <Modal onModalClose={handleCloseModal} modalType={modalType}>
          {modalType === 'ingredient' ? <IngredientDetails /> : <OrderDetails />}
        </Modal>
      )}
      <AppHeader />
      <main className={`${app.main} pl-4 pr-4 mb-10`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            onModalOpen={handleOpenModal}
            getModalType={() => {
              setModalType('ingredient');
            }}
          />
          <BurgerConstructor
            onModalOpen={handleOpenModal}
            getModalType={() => {
              setModalType('order');
            }}
          />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
