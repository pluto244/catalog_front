import { getProductById } from '@/03_widgets/CreateProductForm/ui/CreateProductForm';
import { ProductDetails } from '@/03_widgets/ProductDetails';
import { IProductDetails } from '@/05_entities/product/model/types';
import { useModal } from '@/06_shared/lib/useModal';
import { Loader } from '@/06_shared/ui/Loader/Loader';
import { Modal } from '@/06_shared/ui/Modal/Modal';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import css from './ProductPage.module.css'

export const ProductPage = () => {
  const { isModalOpen, modalContent, modalType, openModal } = useModal();
  const { id: productId } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // TODO: запрос на получение продукта по айди
        const fetchedProduct = await getProductById(Number(productId))
        if (fetchedProduct) {
          setProduct(fetchedProduct)
        } else {
          openModal('Продукт не найден', 'error')
        }
      } catch (err) {
        openModal('Произошла ошибка при загрузке данных', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, openModal])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      <div className={css.container}>
        {product && <ProductDetails product={product} />}
      </div>
      {isModalOpen && <Modal type={modalType}><h3>{modalContent}</h3></Modal>}
    </>
  )
}
