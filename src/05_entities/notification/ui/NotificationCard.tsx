import { Link } from "react-router-dom";
import css from "./NotificationCard.module.css"
import { NotificationDto } from "../model/types";


export const NotificationCard: React.FC<NotificationDto> = (props: NotificationDto ) => {
    const notification = props
    return (
        <Link to={`/product/${notification.ProductId}`} className={css.link}>
            <div className={css.cardWrapper}>
                <div className={css.cardHeader}>
                    <h3 className="text_product_title">{notification.ProductName}</h3>
                </div>
                <div className={css.cardInfoSlot}>
                    <span>{notification.message}</span>
                </div>
            </div>
        </Link>

    );
};