import { DeleteProductButton } from '@/04_features/deleteProduct'
import { SendToModeratorButton } from '@/04_features/sendToModerator'
import { Status } from '@/05_entities/product/model/types'
import { EditProductButton } from '@/06_shared/ui/EditProductButton/EditProductButton'
import css from './UserButtons.module.css'
import { AddToWishlistButton } from '@/04_features/wishlist/addToWishlist/ui/AddToWishlistButton/AddToWishlistButton'
import { useArchiveProductMutation, useDeleteProductMutation, useUnarchiveProductMutation } from '@/06_shared/api/api'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/06_shared/ui/Button/Button'

type Props = {
  isOwner: boolean
  productId: number
  status: Status
}

export const UserButtons = ({isOwner, status, productId} : Props) => {
  const navigate = useNavigate();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [archiveProduct, { isLoading: isArchiving }] = useArchiveProductMutation();
  const [unarchiveProduct, { isLoading: isUnarchiving }] = useUnarchiveProductMutation();
  
  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот продукт? Это действие необратимо.')) {
        try {
            await deleteProduct(productId).unwrap();
            navigate('/');
        } catch (error) {
            console.error('Failed to delete the product: ', error);
        }
    }
  }

  const handleArchive = async () => {
    try {
        await archiveProduct(productId).unwrap();
    } catch (error) {
        console.error('Failed to archive the product: ', error);
    }
  }

  const handleUnarchive = async () => {
    try {
        await unarchiveProduct(productId).unwrap();
    } catch (error) {
        console.error('Failed to unarchive the product: ', error);
    }
  }

  // Если ты не владелец продукта
  if (!isOwner) {
    if (status === Status.APPROVED) {
      return (
        <AddToWishlistButton productId={productId}/>
      )
    }
    return null
  }

  // Если ты владелец продукта
  switch (status) {
    case Status.APPROVED:
      return (
        <div className={css.container}>
          <EditProductButton/>
          <Button onClick={handleArchive} isLoading={isArchiving}>Архивировать</Button>
          <DeleteProductButton onClick={handleDelete} isLoading={isDeleting}/>
        </div>
      )
    case Status.ARCHIVED:
      return (
        <div className={css.container}>
          <div className={css.container}>
            <Button onClick={handleUnarchive} isLoading={isUnarchiving}>Восстановить</Button>
            <EditProductButton/>
          </div>
          <DeleteProductButton onClick={handleDelete} isLoading={isDeleting}/>
        </div>
      )
    case Status.MODERATION_DENIED:
      return (
        <EditProductButton/>
      )
    default:
      return null;
  }
}