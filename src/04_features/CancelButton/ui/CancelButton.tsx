import { Button } from "@/06_shared/ui/Button/Button"
import { Link } from "react-router-dom"

export const CancelButton = () => {
  return (
    <Link to='/'>
      <Button>Отменить</Button>
    </Link>
  )
}