import { Button } from "@/06_shared/ui/Button/Button"
import { useState } from "react"

type Props = {
  onClick: () => void 
}

export const DeleteProductButton = ({onClick} : Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = () => {
    setIsLoading(true)
    onClick()
  }

  return (
    <Button isLoading={isLoading} onClick={handleClick}>Удалить</Button>
  )
}