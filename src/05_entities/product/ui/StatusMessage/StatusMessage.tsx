import { Status } from "../../model/types";


type Props = {
    status: Status;
}
export const StatusMessage = ({status}: Props) => {
    const getStatusMessage = (status: Status): string => {
      switch (status) {
        case Status.ARCHIVED:
          return 'Продукт находится в архиве';
        case Status.ON_MODERATION:
          return 'Продукт находится на модерации';
        case Status.MODERATION_DENIED:
          return 'Требуется внести изменения';
        default:
          return '';
      }
    }
  
    const message = getStatusMessage(status)
  
    return message ? <span className="product_card_info_span">{message}</span> : null
  }