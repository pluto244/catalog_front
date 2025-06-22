import { Link } from "react-router-dom"
import { Button } from "../Button/Button"

export const EditProductButton = () => {
  return (
    <Link to='edit'>
      <Button>Редактировать</Button>
    </Link>
  )
}