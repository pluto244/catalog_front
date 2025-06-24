import { DeleteProductButton } from '@/04_features/deleteProduct'
import { Status } from '@/05_entities/product/model/types'
import { EditProductButton } from '@/06_shared/ui/EditProductButton/EditProductButton'
import css from './UserButtons.module.css'
import { AddToWishlistButton } from '@/04_features/wishlist/addToWishlist/ui/AddToWishlistButton/AddToWishlistButton'
import { useArchiveProductMutation, useDeleteProductMutation, useUnarchiveProductMutation } from '@/06_shared/api/api'
import { Button } from '@/06_shared/ui/Button/Button'
import { useModal } from '@/06_shared/lib/useModal'
import { Modal } from '@/06_shared/ui/Modal/Modal'
import { useNavigate } from 'react-router-dom'

type Props = {
  isOwner: boolean
  productId: number
  status: Status
}

export const UserButtons = ({ isOwner, status, productId }: Props) => {
  const { isModalOpen, modalProps, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [archiveProduct, { isLoading: isArchiving }] = useArchiveProductMutation();
  const [unarchiveProduct, { isLoading: isUnarchiving }] = useUnarchiveProductMutation();
  
  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот продукт? Это действие необратимо.')) {
        try {
            await deleteProduct(productId).unwrap();
            openModal('Продукт успешно удален', 'success');
        } catch (error) {
            openModal('Ошибка при удалении продукта', 'error');
            console.error('Failed to delete the product: ', error);
        }
    }
  }

  const handleArchive = async () => {
    try {
        await archiveProduct(productId).unwrap();
        openModal('Продукт успешно архивирован', 'success', 'Отлично');
    } catch (error) {
        openModal('Ошибка при архивации продукта', 'error');
        console.error('Failed to archive the product: ', error);
    }
  }

  const handleUnarchive = async () => {
    try {
        await unarchiveProduct(productId).unwrap();
        openModal('Продукт успешно восстановлен', 'success', 'Отлично');
    } catch (error) {
        openModal('Ошибка при восстановлении продукта', 'error');
        console.error('Failed to unarchive the product: ', error);
    }
  }

  const handleModalClose = () => {
    closeModal();
    navigate('/');
  }

  let buttons = null;

  if (!isOwner) {
    if (status === Status.APPROVED) {
      buttons = <AddToWishlistButton productId={productId}/>
    }
  } else {
    switch (status) {
      case Status.APPROVED:
        buttons = (
          <div className={css.container}>
            <EditProductButton/>
            <Button onClick={handleArchive} isLoading={isArchiving}>Архивировать</Button>
            <DeleteProductButton onClick={handleDelete} isLoading={isDeleting}/>
          </div>
        )
        break;
      case Status.ARCHIVED:
        buttons = (
          <div className={css.container}>
            <div className={css.container}>
              <Button onClick={handleUnarchive} isLoading={isUnarchiving}>Восстановить</Button>
              <EditProductButton/>
            </div>
            <DeleteProductButton onClick={handleDelete} isLoading={isDeleting}/>
          </div>
        )
        break;
      case Status.MODERATION_DENIED:
        buttons = <EditProductButton/>
        break;
      default:
        buttons = null;
    }
  }

  return (
    <>
      {buttons}
      {isModalOpen && (
        <Modal 
          type={modalProps.type}
          onClose={handleModalClose}
          buttonText={modalProps.buttonText}
        >
          <h3>{modalProps.content}</h3>
        </Modal>
      )}
    </>
  )
}