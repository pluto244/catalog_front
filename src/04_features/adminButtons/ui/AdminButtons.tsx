import { Status } from '@/05_entities/product/model/types';
import { Button } from '@/06_shared/ui/Button/Button';
import css from './AdminButtons.module.css'

type Props = {
  status: Status
}

export const AdminButtons = ({status} : Props) => {
  // TODO: запрос
  return (
    <>  
      {status === Status.ON_MODERATION && (
      <div className={css.container}>
        <Button>Опубликовать</Button>
        <Button>Отправить на изменения</Button>
      </div>
      )}
    </>
  )
}