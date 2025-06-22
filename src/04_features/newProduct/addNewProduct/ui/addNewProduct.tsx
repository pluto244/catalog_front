import { Button } from '@/06_shared/ui/Button/Button'
import { Link } from 'react-router-dom'

export const AddNewProduct = () => {
  return (
    <Link to='/addNewProduct'>
      <Button>Добавить продукт</Button>
    </Link>
  )
}