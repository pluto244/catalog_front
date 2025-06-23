import { ProductDetails } from '@/03_widgets/ProductDetails';
import { useModal } from '@/06_shared/lib/useModal';
import { Loader } from '@/06_shared/ui/Loader/Loader';
import { Modal } from '@/06_shared/ui/Modal/Modal';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import css from './ProductPage.module.css'
import { useGetProductByIdQuery } from '@/06_shared/api/api';

export const ProductPage = () => {
  const { isModalOpen, modalProps, openModal, navigateAndClose } = useModal();
  const { id: productId } = useParams<{ id: string }>();

  const { data: product, isLoading, error } = useGetProductByIdQuery(Number(productId), {
    skip: !productId,
  });

  useEffect(() => {
    if (error) {
      if (typeof error === 'object' && error !== null && 'status' in error && error.status === 404) {
        openModal('Продукт был удален или не найден', 'error', 'К продуктам');
      } else {
        openModal('Произошла ошибка при загрузке продукта', 'error');
      }
    }
  }, [error, openModal]);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
      <div className={css.container}>
        {product && <ProductDetails product={product} />}
      </div>
      {isModalOpen && (
        <Modal 
          type={modalProps.type}
          onClose={() => navigateAndClose()}
          buttonText={modalProps.buttonText}
        >
          <h3>{modalProps.content}</h3>
        </Modal>
      )}
    </>
  )
}
