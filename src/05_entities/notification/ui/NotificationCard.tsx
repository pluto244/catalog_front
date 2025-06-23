import { Link } from "react-router-dom";
import css from "./NotificationCard.module.css"
import { NotificationDto, NotificationMessage } from "../model/types";


export const NotificationCard: React.FC<NotificationDto> = (props: NotificationDto ) => {
    const notification = props
    return (
        <Link to={`/product/${notification.productId}`} className={css.link}>
            <div className={css.cardWrapper}>
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
            </div>
        </Link>

    );
};