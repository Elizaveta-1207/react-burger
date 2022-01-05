import React from 'react';
import modalOverlay from './ModalOverlay.module.css';

function ModalOverlay({ children, onModalClose }) {
  const closeEsc = (e) => {
    e.code === 'Escape' && onModalClose();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', closeEsc);
    return () => document.removeEventListener('keydown', closeEsc);
  }, []);

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
