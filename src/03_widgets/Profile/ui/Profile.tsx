import { useParams } from 'react-router-dom'
import css from './Profile.module.css'
import { AddNewProduct } from '@/04_features/newProduct/addNewProduct'
import { useSelector } from 'react-redux'
import { RootState } from '@/01_app/AppStore'

export const Profile = () => {
  const userId = useSelector((state: RootState) => state.session.userId);
  const { id } = useParams<{ id: string }>(); 
  const numericId = id ? Number(id) : null;

  return (
    <div className={css.root}>
      <h2 className={css.profile_title}>Профиль</h2>
      { userId === numericId ? <AddNewProduct/> : null }
    </div>
  )
}
