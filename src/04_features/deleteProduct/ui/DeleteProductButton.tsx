import { Button } from "@/06_shared/ui/Button/Button"
import { useState } from "react"

type Props = {
  onClick: () => void 
  isLoading?: boolean
}

export const DeleteProductButton = ({onClick, isLoading} : Props) => {

  const handleClick = () => {
    onClick()
  }

  return (
    <Button isLoading={isLoading} onClick={handleClick}>Удалить</Button>
  )
}