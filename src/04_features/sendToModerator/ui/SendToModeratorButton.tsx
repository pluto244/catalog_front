import { Button } from "@/06_shared/ui/Button/Button"

type Props = {
  disabled?: boolean
}

export const SendToModeratorButton = ({disabled} : Props) => {

  return (
    <Button isLoading={disabled} type='submit'>Опубликовать</Button>
  )
}