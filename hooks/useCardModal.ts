import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    showModal,
    hideModal,
  };
};

export default useModal;
