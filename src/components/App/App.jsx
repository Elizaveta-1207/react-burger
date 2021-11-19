import React from 'react';
// import logo from '../../logo.svg';
import app from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
// import data from '../../utils/data.json';
const API = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState();
  const [ingerients, setIngredients] = React.useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const ingredientType = () => {
    setModalType('ingredient');
  };
  const orderType = () => {
    setModalType('order');
  };

  const handleSetIngredients = (ingr) => {
    setIngredients(ingr);
  };

  React.useEffect(() => {
    fetch(`${API}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(modalType);
  return (
    <>
      {showModal && (
        <Modal onModalClose={handleCloseModal} modalType={modalType}>
          {modalType === 'ingredient' ? <IngredientDetails {...ingerients} /> : <OrderDetails />}
        </Modal>
      )}
      <AppHeader />
      <main className={`${app.main} pl-4 pr-4 mb-10`}>
        {data && (
          <>
            <BurgerIngredients
              data={data}
              onModalOpen={handleOpenModal}
              getModalType={ingredientType}
              getIngredients={handleSetIngredients}
            />
            <BurgerConstructor data={data} onModalOpen={handleOpenModal} getModalType={orderType} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
