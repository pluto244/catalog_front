import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type ModalProps = {
    content: React.ReactNode | null,
    type: 'success' | 'error' | null,
    buttonText?: string,
}

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
      content: null,
      type: null,
      buttonText: 'Главный экран',
  });
  const navigate = useNavigate();

  const openModal = useCallback((content: React.ReactNode | null, type: 'success' | 'error', buttonText?: string) => {
    setModalProps({ content, type, buttonText });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const navigateAndClose = useCallback((path: string = '/') => {
    closeModal();
    navigate(path);
  }, [navigate, closeModal]);

  return {
    isModalOpen,
    modalProps,
    openModal,
    closeModal,
    navigateAndClose,
  };
};