import {
    useGetUserProductsByStatusQuery,
    useGetFollowedProductsQuery,
    useGetNotificationsQuery
} from '@/06_shared/api/api';
import { ProductCategory, Status, ProductPreviewCardDto } from '@/05_entities/product/model/types';
import { NotificationDto } from '@/05_entities/notification/model/types';

export const useProfileCategoryData = (
    currentCategory: ProductCategory,
    profileId: number | null,
    currentUserId: number | null
) => {
    const userProductsQuery = useGetUserProductsByStatusQuery(
        { userId: profileId!, status: Status.APPROVED },
        { skip: currentCategory !== ProductCategory.UserProducts || !profileId }
    );
    const toDoProductsQuery = useGetUserProductsByStatusQuery(
        { userId: profileId!, status: Status.MODERATION_DENIED },
        { skip: currentCategory !== ProductCategory.ToDo || !profileId }
    );
    const archiveProductsQuery = useGetUserProductsByStatusQuery(
        { userId: profileId!, status: Status.ARCHIVED },
        { skip: currentCategory !== ProductCategory.Archive || !profileId }
    );
    const favoriteProductsQuery = useGetFollowedProductsQuery(
        currentUserId!,
        { skip: currentCategory !== ProductCategory.Favorites || !currentUserId || profileId !== currentUserId }
    );
    const notificationsQuery = useGetNotificationsQuery(
        currentUserId!,
        { skip: currentCategory !== ProductCategory.Notifications || !currentUserId }
    );

    const refetch = () => {
        switch (currentCategory) {
            case ProductCategory.UserProducts:
                userProductsQuery.refetch();
                break;
            case ProductCategory.ToDo:
                toDoProductsQuery.refetch();
                break;
            case ProductCategory.Archive:
                archiveProductsQuery.refetch();
                break;
            case ProductCategory.Favorites:
                favoriteProductsQuery.refetch();
                break;
            case ProductCategory.Notifications:
                notificationsQuery.refetch();
                break;
        }
    };

    const isLoading = userProductsQuery.isLoading || toDoProductsQuery.isLoading || archiveProductsQuery.isLoading || favoriteProductsQuery.isLoading || notificationsQuery.isLoading;

    let products: ProductPreviewCardDto[] | undefined;
    switch (currentCategory) {
        case ProductCategory.UserProducts:
            products = userProductsQuery.data;
            break;
        case ProductCategory.ToDo:
            products = toDoProductsQuery.data;
            break;
        case ProductCategory.Archive:
            products = archiveProductsQuery.data;
            break;
        case ProductCategory.Favorites:
            products = favoriteProductsQuery.data;
            break;
        default:
            products = [];
    }
    
    const productResults = products || [];
    const notificationResults = notificationsQuery.data || [];

    return { isLoading, productResults, notificationResults, refetch };
}; 