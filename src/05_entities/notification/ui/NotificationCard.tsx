import { Link } from "react-router-dom";
import css from "./NotificationCard.module.css"
import { NotificationDto, NotificationMessage } from "../model/types";
import { useDeleteNotificationMutation } from "@/06_shared/api/api";
import { DeleteNotificationButton } from "@/04_features/deleteNotification";


export const NotificationCard: React.FC<NotificationDto> = (props: NotificationDto ) => {
    const notification = props
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        deleteNotification(notification.id);
    }

    return (
        <div className={css.cardWrapper}>
            <DeleteNotificationButton onClick={handleDelete} isLoading={isLoading}/>
            <Link to={`/product/${notification.productId}`} className={css.link}>
                <div className={css.cardHeader}>
                    <h3 className="text_product_title">{notification.titleOfProduct}</h3>
                </div>
                <div className={css.productDescriptionSlot}>
                    <p className="text_product_description">
                        {notification.descriptionOfProduct}
                    </p>
                </div>
                <div className={css.cardInfoSlot}>
                    <span>{NotificationMessage[notification.message]}</span>
                </div>
            </Link>
        </div>
    );
};