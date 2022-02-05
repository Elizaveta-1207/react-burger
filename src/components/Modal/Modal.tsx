import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import modal from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot: HTMLElement | null = document.getElementById('modals');

type TModalProps = {
  onModalClose: () => void;
  modalType: string | null;
  title?: string;
};

export const Modal: FC<TModalProps> = ({ onModalClose, children, modalType, title }) => {
  const closeEsc = (e: KeyboardEvent) => {
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
          <div className={`${modal.close} pt-10  pr-10`}>
            <CloseIcon type='primary' onClick={onModalClose} />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot!,
  );
};

export default Modal;
