import { CancelButton } from '@/04_features/CancelButton'
import { SendToModeratorButton } from '@/04_features/sendToModerator'
import { LabeledField } from '@/06_shared/ui/LabeledField/LabeledField'
import css from './CreateProductForm.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/06_shared/lib/useModal'
import { Modal } from '@/06_shared/ui/Modal/Modal'
import { productsMock } from '@/06_shared/lib/server'
import { ProductDto, ProductId } from '@/05_entities/product'
import { Status } from '@/05_entities/product/model/types'
import { DeleteProductButton } from '@/04_features/deleteProduct'
import { deleteProductRequest } from '@/04_features/deleteProduct/category/api/deleteProductRequest'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@/06_shared/ui/Loader/Loader'

export type TCreateProductForm = {
  title: string
  category: string
  linkToWebSite: string
  description: string
  emailOfSupport: string
}

const defaultFormValues = {
  title: '',
  category: '',
  linkToWebSite: '',
  description: '',
  emailOfSupport: '',
}

type Props = {
  productId: string | undefined,
  formMode: 'add' | 'edit'
}

// моковый запрос получения данных продукта
export const getProductById = (productId: ProductId): Promise<ProductDto> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = productsMock.find(product => product.id === productId)
      if (product) {
        const productWithCorrectTypes: ProductDto = {
          ...product,
          status: product.status as Status, 
        };
        resolve(productWithCorrectTypes);
      } else {
        reject(new Error('Продукт не найден'))
      }
    }, 500)
  })
}

export const CreateProductForm = ({productId, formMode} : Props) => {
  const { isModalOpen, modalContent, modalType, openModal } = useModal();
  const numericId = Number(productId);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const userId = useSelector((state: RootState) => state.session.userId);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields, isLoading },
  } = useForm<TCreateProductForm>({
    defaultValues: async () => {
      if (productId) {
        try {
          const product = await getProductById(numericId)
          setOwnerId(product.ownerId)
          return product
        } catch (error) {
          openModal('Произошла ошибка при загрузке данных', 'error')
          return defaultFormValues
        }
      } else {
        return defaultFormValues
      }
    }
  })

  useEffect(() => {
    if (formMode === 'edit' && ownerId !== null) {
      if (userId !== ownerId) {
        navigate('/')
      }
    }
  }, [ownerId, userId, formMode, navigate]);
  

  const onSubmit: SubmitHandler<TCreateProductForm> = async (data) => {
    if (!isDirty) {
      return
    }
    
    // TODO: запрос 
    try {
      // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/18765432')
      if (response.ok) {
        openModal('Успешно', 'success')
      } else {
        throw new Error('Произошла ошибка')
      }
    } catch(error) {
      openModal('Произошла ошибка', 'error')
    }

    console.log(data)
  };

  const handleDelete = async () => {
    try {
      await deleteProductRequest(numericId)
      openModal('Продукт успешно удалён', 'success')
    } catch (error) {
      openModal('Произошла ошибка при удалении продукта', 'error')
    }
  }

  return (
    <>
      {
        isLoading ? <Loader/> : 
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabeledField id='title' label={'Название продукта'} register={register('title', { required: true })} />
          <LabeledField id='category' label={'Категория'} register={register('category', { required: true })} />
          <LabeledField 
            id='linkToWebSite'
            label={'Ссылка на продукт'} 
            register={register('linkToWebSite', { 
              required: true, 
            })}
          />
          <LabeledField
            id='description'
            label={'Описание продукта'}
            inputStyle={'description'}
            maxLength={500}
            register={register('description', { 
              required: true, 
              // minLength: 10
            })}
          />
          <LabeledField id='emailOfSupport' label={'Контакт поддержки'} register={register('emailOfSupport', { required: true })} />
          <div className={css.field_error}>
            {Object.keys(errors).length > 0 &&
              <span>Все поля должны быть заполнены</span>
            }
            {productId && Object.keys(dirtyFields).length === 0 && (
              <span>Продукт не был изменен</span>
            )}
          </div>
          <div className={css.container}>
            {productId ? (
              <>
                <div className={css.container}>
                  <SendToModeratorButton disabled={isSubmitting} />
                  <CancelButton />
                </div>
                <DeleteProductButton onClick={handleDelete}/>
              </>
            ) : (
              <>
                <SendToModeratorButton disabled={isSubmitting} />
                <CancelButton />
              </>
            )}
          </div>
        </form>
      }
      {isModalOpen && <Modal type={modalType}><h3>{modalContent}</h3></Modal>}
    </>
  )
}