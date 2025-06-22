

export interface NotificationDto {
    id: number;
    ProductId: number;
    ProductName: string;
    message: NotificationMessage;
}


export enum NotificationMessage {
    PRODUCT_WAS_SET_ON_MODERATION = 'На модерации',
    PRODUCT_WAS_PUBLISHED = 'Опубликовали',
    PRODUCT_WAS_EDITED = 'Отредактировали',
    PRODUCT_ON_MODERATION_WAS_EDITED = 'На модерации',
    PRODUCT_WAS_DECLINED_OF_MODERATION = 'Отклонен с модерации',
    PRODUCT_WAS_ARCHIVED = 'Архивировали',
    PRODUCT_WAS_UNARCHIVED = 'Активен',
    PRODUCT_WAS_DELETED = 'Продукт был удален'
}
