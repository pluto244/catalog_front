import { Icon } from "@/06_shared/ui/Icon/Icon";
import css from './DeleteNotificationButton.module.css';
import cn from 'classnames';

type Props = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isLoading?: boolean;
}

export const DeleteNotificationButton = ({ onClick, isLoading }: Props) => {
    return (
        <button onClick={onClick} disabled={isLoading} className={css.deleteButton}>
            {isLoading 
                ? <Icon className={css.loader} type="loader" /> 
                : <Icon type="delete" className={css.deleteIcon} />
            }
        </button>
    )
} 