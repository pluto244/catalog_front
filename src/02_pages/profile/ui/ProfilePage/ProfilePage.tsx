import React, { useEffect } from 'react'
import { Profile } from '@/03_widgets/Profile';
import { User } from '@/05_entities/user';
import { ProfileCategory } from '@/03_widgets/Category/ProfileCategory/ProfileCategory';
import { useParams } from 'react-router-dom';
import { useModal } from '@/06_shared/lib/useModal';
import { Loader } from '@/06_shared/ui/Loader/Loader';
import { Modal } from '@/06_shared/ui/Modal/Modal';
import { useGetUserByIdQuery } from '@/06_shared/api/api';

export function ProfilePage() {
  const { isModalOpen, modalProps, openModal, navigateAndClose } = useModal();
  const { id: userId } = useParams<{ id: string }>();

  const { data: user, isLoading, isError } = useGetUserByIdQuery(Number(userId), {
    skip: !userId,
  });

  useEffect(() => {
    if (isError) {
      openModal('Произошла ошибка при загрузке профиля', 'error');
    }
  }, [isError, openModal]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Profile />
      {user &&
        <User
          user={user}
        />
      }
      <ProfileCategory />
      {isModalOpen && (
        <Modal 
          type={modalProps.type}
          onClose={navigateAndClose}
          buttonText={modalProps.buttonText}
        >
          <h3>{modalProps.content}</h3>
        </Modal>
      )}
    </>
  )
}