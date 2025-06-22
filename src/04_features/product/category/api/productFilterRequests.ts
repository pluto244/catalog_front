import { NotificationDto, NotificationMessage } from '@/05_entities/notification/model/types';
import { ProductPreviewCardDto, Status } from '@/05_entities/product/model/types';
import { productsMockCards, notificationMock } from '@/06_shared/lib/server';

const mockProducts: ProductPreviewCardDto[] = productsMockCards.map(product => {
    return {
        ...product,
        status: product.status as Status,
    };
});


export const fetchNotifications = async (): Promise<NotificationDto[]> => {
    let activeMocks = notificationMock.map(item => ({
        id: item.id,
        ProductId: item.ProductId,
        ProductName: item.ProductName,
        message: NotificationMessage[item.message as keyof typeof NotificationMessage]
      }));
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(activeMocks);
        }, 500);
    });
};

export const fetchMainProducts = async (id?: number): Promise<ProductPreviewCardDto[]> => {
    let activeMocks = mockProducts.filter(product => product.status === Status.APPROVED)
    if (id) {
        activeMocks = activeMocks.filter(product => id === product.ownerId);
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(activeMocks);
        }, 500);
    });
};

export const fetchFavoriteProducts = async (ids: number[]): Promise<ProductPreviewCardDto[]> => {
    const activeMocks = mockProducts.filter(product => product.status === Status.APPROVED)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(activeMocks.filter(product => ids.includes(product.id)));
        }, 500);
    });
};


export const fetchToDoProducts = async (userId: number): Promise<ProductPreviewCardDto[]> => {
    const toDoMocks = mockProducts.filter(product => product.status === Status.MODERATION_DENIED && product.ownerId === userId)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(toDoMocks);
        }, 500);
    });
};

export const fetchArchiveProducts = async (userId: number): Promise<ProductPreviewCardDto[]> => {
    const archiveMocks = mockProducts.filter(product => product.status === Status.ARCHIVED && product.ownerId === userId)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(archiveMocks);
        }, 500);
    });
};
