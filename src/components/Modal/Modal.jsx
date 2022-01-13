import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import modal from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modals');

function Modal({ onModalClose, children, modalType, title }) {
  const closeEsc = (e) => {
    e.code === 'Escape' && onModalClose();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', closeEsc);
    return () => document.removeEventListener('keydown', closeEsc);
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onModalClose={onModalClose}>
      <div className={`${modal.modal}`}>
        <div
          className={`${modal.title} pt-10 pl-10 pr-10`}
          style={{ justifyContent: modalType === 'ingredient' ? 'space-between' : 'end' }}
        >
          {modalType === 'ingredient' && <p className={`text text_type_main-large`}>{title}</p>}
          <CloseIcon type='primary' onClick={onModalClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  modalType: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onModalClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
