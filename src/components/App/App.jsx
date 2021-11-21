import React from 'react';
import app from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

const BASE_API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState();
  const [ingredients, setIngredients] = React.useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSetIngredients = (ingr) => {
    setIngredients(ingr);
  };

  React.useEffect(() => {
    fetch(`${BASE_API_URL}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {showModal && (
        <Modal onModalClose={handleCloseModal} modalType={modalType}>
          {modalType === 'ingredient' ? <IngredientDetails {...ingredients} /> : <OrderDetails />}
        </Modal>
      )}
      <AppHeader />
      <main className={`${app.main} pl-4 pr-4 mb-10`}>
        {data && (
          <>
            <BurgerIngredients
              data={data}
              onModalOpen={handleOpenModal}
              getModalType={() => {
                setModalType('ingredient');
              }}
              getIngredients={handleSetIngredients}
            />
            <BurgerConstructor
              data={data}
              onModalOpen={handleOpenModal}
              getModalType={() => {
                setModalType('order');
              }}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
