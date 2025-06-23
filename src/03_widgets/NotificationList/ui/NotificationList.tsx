import css from './Notification.module.css'

import { NotificationDto } from '@/05_entities/notification/model/types'
import { NotificationCard } from '@/05_entities/notification/ui/NotificationCard'



type NotificationCardListType = {
    notifications: NotificationDto[]
}


export function NotificationList(props: NotificationCardListType) {
    const { notifications } = props

    return (
        <div className={css.notificationListWrapper}>
            {notifications.map(notification => (
                <NotificationCard
                    key={notification.id}
                    {...notification}
                />
            ))}
        </div>
    )
}
