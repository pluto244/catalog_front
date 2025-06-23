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
    const { data: userProducts, isLoading: isLoadingUserProducts } = useGetUserProductsByStatusQuery(
        { userId: profileId!, status: Status.APPROVED },
        { skip: currentCategory !== ProductCategory.UserProducts || !profileId }
    );
    const { data: toDoProducts, isLoading: isLoadingToDo } = useGetUserProductsByStatusQuery(
        { userId: profileId!, status: Status.MODERATION_DENIED },
        { skip: currentCategory !== ProductCategory.ToDo || !profileId }
    );
    const { data: archiveProducts, isLoading: isLoadingArchive } = useGetUserProductsByStatusQuery(
        { userId: profileId!, status: Status.ARCHIVED },
        { skip: currentCategory !== ProductCategory.Archive || !profileId }
    );
    const { data: favoriteProducts, isLoading: isLoadingFavorites } = useGetFollowedProductsQuery(
        currentUserId!,
        { skip: currentCategory !== ProductCategory.Favorites || !currentUserId }
    );
    const { data: notifications, isLoading: isLoadingNotifications } = useGetNotificationsQuery(
        currentUserId!,
        { skip: currentCategory !== ProductCategory.Notifications || !currentUserId }
    );

    const isLoading = isLoadingUserProducts || isLoadingToDo || isLoadingArchive || isLoadingFavorites || isLoadingNotifications;

    let products: ProductPreviewCardDto[] | undefined;
    switch (currentCategory) {
        case ProductCategory.UserProducts:
            products = userProducts;
            break;
        case ProductCategory.ToDo:
            products = toDoProducts;
            break;
        case ProductCategory.Archive:
            products = archiveProducts;
            break;
        case ProductCategory.Favorites:
            products = favoriteProducts;
            break;
        default:
            products = [];
    }
    
    const productResults = products || [];
    const notificationResults = notifications || [];

    return { isLoading, productResults, notificationResults };
}; 