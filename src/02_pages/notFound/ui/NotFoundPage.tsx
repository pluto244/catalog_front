import { Modal } from "@/06_shared/ui/Modal/Modal"
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  }

  return (
    <Modal type='error' onClose={handleClose}>Страница не найдена</Modal>
  )
}