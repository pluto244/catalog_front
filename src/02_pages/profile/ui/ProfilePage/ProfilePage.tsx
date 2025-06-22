import React, { useEffect, useState } from 'react'
import { Profile } from '@/03_widgets/Profile';
import { User, UserDto } from '@/05_entities/user';
import { ProfileCategory } from '@/03_widgets/Category/ProfileCategory/ProfileCategory';
import { useNavigate, useParams } from 'react-router-dom';
import { usersMock } from '@/06_shared/lib/server';
import { Roles } from '@/05_entities/user/api/types';
import { useModal } from '@/06_shared/lib/useModal';
import { Loader } from '@/06_shared/ui/Loader/Loader';
import { Modal } from '@/06_shared/ui/Modal/Modal';

// моковый запрос получения данных пользователя
const getUserById = (profileId: number): Promise<UserDto> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const user = usersMock.find(user => user.id === profileId);
      if (user) {
        const userWithCorrectTypes: UserDto = {
          ...user,
          role: user.role as Roles,
        };
        resolve(userWithCorrectTypes);

      } else {
        reject(new Error('Профиль не найден'))
      }
    }, 500)
  })
}

export function ProfilePage() {

  const { isModalOpen, modalContent, modalType, openModal } = useModal();
  const [user, setUser] = useState<UserDto | null>();
  const { id: userId } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchUser = async () => {
      try {
      
        const fetchedUser = await getUserById(Number(userId))

        if (fetchedUser) {
          setUser(fetchedUser)
        } else {
          openModal('Пользователь не найден', 'error')
        }
      } catch (err) {
        openModal('Произошла ошибка при загрузке данных', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId, openModal])

  if (loading) {
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
      {isModalOpen && <Modal type={modalType}><h3>{modalContent}</h3></Modal>}
    </>
  )
}