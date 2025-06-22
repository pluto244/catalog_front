import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null);
  const navigate = useNavigate() 

  const openModal = useCallback((content: string | null, type: 'success' | 'error') => {
    setModalContent(content);
    setModalType(type);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalType(null);
    navigate('/')
  }, [navigate]);

  return {
    isModalOpen,
    modalContent,
    modalType,
    openModal,
    closeModal,
  };
};