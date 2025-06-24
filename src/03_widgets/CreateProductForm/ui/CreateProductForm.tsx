import { CancelButton } from '@/04_features/CancelButton'
import { SendToModeratorButton } from '@/04_features/sendToModerator'
import { LabeledField } from '@/06_shared/ui/LabeledField/LabeledField'
import css from './CreateProductForm.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/06_shared/lib/useModal'
import { Modal } from '@/06_shared/ui/Modal/Modal'
import { DeleteProductButton } from '@/04_features/deleteProduct'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@/06_shared/ui/Loader/Loader'
import { useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductByIdQuery, useUnarchiveProductMutation } from '@/06_shared/api/api'
import { Status } from '@/05_entities/product/model/types'

export type TCreateProductForm = {
  title: string
  category: string
  linkToWebSite: string
  description: string
  emailOfSupport: string
}

const defaultFormValues: TCreateProductForm = {
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

export const CreateProductForm = ({productId, formMode} : Props) => {
  const { isModalOpen, modalProps, openModal, closeModal, navigateAndClose } = useModal();
  const numericId = Number(productId);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const userId = useSelector((state: RootState) => state.session.userId);
  const navigate = useNavigate();

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [unarchiveProduct] = useUnarchiveProductMutation();

  const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery(numericId, {
    skip: !productId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<TCreateProductForm>({
    defaultValues: defaultFormValues
  });

  useEffect(() => {
    if (formMode === 'edit' && productData) {
        reset({
            title: productData.title,
            category: productData.category,
            linkToWebSite: productData.linkToWebSite,
            description: productData.description,
            emailOfSupport: productData.emailOfSupport
        });
        setOwnerId(productData.ownerId);
    }
  }, [productData, formMode, reset]);

  useEffect(() => {
    if (formMode === 'edit' && ownerId !== null) {
      if (userId !== ownerId) {
        navigate('/')
      }
    }
  }, [ownerId, userId, formMode, navigate]);
  

  const onSubmit: SubmitHandler<TCreateProductForm> = async (data) => {
    const requestBody = {
      title: data.title,
      category: data.category,
      linkToWebSite: data.linkToWebSite,
      description: data.description,
      emailOfSupport: data.emailOfSupport,
    };

    try {
      if (formMode === 'edit' && productId) {

        if (productData?.status === Status.ARCHIVED) {
          await unarchiveProduct(numericId).unwrap();
        }
        await editProduct({ id: numericId, ...requestBody }).unwrap();
        openModal('Продукт успешно отредактирован', 'success');
      } else {
        await addProduct(requestBody).unwrap();
        openModal('Продукт успешно добавлен и отправлен на модерацию', 'success');
      }
    } catch(error) {
      openModal('Произошла ошибка', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот продукт? Это действие необратимо.')) {
        try {
            await deleteProduct(numericId).unwrap();
            openModal('Продукт успешно удалён', 'success');
            navigate('/');
        } catch (error) {
            openModal('Произошла ошибка при удалении продукта', 'error');
        }
    }
  }

  const isLoading = isAdding || isEditing;

  const handleModalClose = () => {
    if (modalProps.type === 'success') {
      navigate('/');
    } else {
      closeModal();
    }
  };

  return (
    <div className={css.pageContainer}>
        <h1>{formMode === 'edit' ? 'Редактирование продукта' : 'Создание нового продукта'}</h1>
        {
            isProductLoading ? <Loader/> : 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={css.fieldsWrapper}>
                    <LabeledField 
                        id='title' 
                        label={'Название продукта'} 
                        error={errors.title}
                        register={register('title', { required: 'Название обязательно' })} 
                    />
                    <LabeledField 
                        id='category' 
                        label={'Категория'}
                        error={errors.category}
                        register={register('category', { required: 'Категория обязательна' })} 
                    />
                    <LabeledField 
                        id='linkToWebSite'
                        label={'Ссылка на продукт'} 
                        error={errors.linkToWebSite}
                        register={register('linkToWebSite', { required: 'Ссылка обязательна' })}
                    />
                    <LabeledField 
                        id='emailOfSupport' 
                        label={'Контакт поддержки'}
                        error={errors.emailOfSupport}
                        register={register('emailOfSupport', { required: 'Email обязателен' })} 
                    />
                    <LabeledField
                        id='description'
                        label={'Описание продукта'}
                        inputStyle={'description'}
                        maxLength={500}
                        error={errors.description}
                        register={register('description', { required: 'Описание обязательно' })}
                    />
                </div>
                <div className={css.actionsContainer}>
                    {formMode === 'edit' ? (
                    <>
                        <div className={css.mainActions}>
                            <SendToModeratorButton disabled={isLoading} />
                            <CancelButton />
                        </div>
                        <DeleteProductButton onClick={handleDelete}/>
                    </>
                    ) : (
                    <div className={css.mainActions}>
                        <SendToModeratorButton disabled={isLoading} />
                        <CancelButton />
                    </div>
                    )}
                </div>
            </form>
        }
        {isModalOpen && (
            <Modal 
                type={modalProps.type}
                onClose={handleModalClose}
                buttonText={modalProps.buttonText}
            >
                <h3>{modalProps.content}</h3>
            </Modal>
        )}
    </div>
  )
}