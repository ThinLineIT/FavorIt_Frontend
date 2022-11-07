import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { isShowModalState, modalComponentState } from '@recoil/layout';

const useModal = () => {
  const [isShowModal, setIsShowModal] = useRecoilState(isShowModalState);
  const setModal = useSetRecoilState(modalComponentState);

  const openModal = (component: React.ReactElement) => {
    setIsShowModal(true);
    setModal(component);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setModal(null);
  };

  return { isShowModal, openModal, closeModal };
};

export default useModal;
