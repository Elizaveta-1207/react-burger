import React, {FC} from 'react';
import PropTypes from 'prop-types';
import modalOverlay from './ModalOverlay.module.css';

type TModalOverlay = {

  onModalClose: () => void;
};

export const ModalOverlay: FC<TModalOverlay>=({ children, onModalClose }) =>{
  return (
    <div
      className={modalOverlay.container}
      onClick={(e) => e.target === e.currentTarget && onModalClose()}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
