import React from 'react';
import PropTypes from 'prop-types';
import modalOverlay from './ModalOverlay.module.css';

function ModalOverlay({ children, onModalClose }) {
  return (
    <div
      className={modalOverlay.container}
      onClick={(e) => e.target === e.currentTarget && onModalClose()}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
