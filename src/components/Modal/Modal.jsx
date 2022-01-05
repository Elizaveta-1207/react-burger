import React from 'react';
import ReactDOM from 'react-dom';
import modal from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modals');

function Modal({ onModalClose, children, modalType }) {
  return ReactDOM.createPortal(
    <ModalOverlay onModalClose={onModalClose}>
      <div className={`${modal.modal}`}>
        <div
          className={`${modal.title} pt-10 pl-10 pr-10`}
          style={{ justifyContent: modalType === 'ingredient' ? 'space-between' : 'end' }}
        >
          {modalType === 'ingredient' && (
            <p className={`text text_type_main-large`}>Детали ингредиента</p>
          )}
          <CloseIcon type='primary' onClick={onModalClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
}

export default Modal;
