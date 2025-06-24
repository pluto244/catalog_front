import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/01_app/AppStore';
import { AddToWishlistIcon } from '@/04_features/wishlist/addToWishlist/ui/AddToWishlistIcon/AddToWishlistIcon';
import { ProductCategory, ProductPreviewCardDto } from '@/05_entities/product/model/types';
import { useParams } from 'react-router-dom';
import { ProductFilterButtonsProfile } from '@/04_features/product/ui/ProductFilterButtonsProfile';
import { ProductCardList } from '@/03_widgets/ProductCardList/ui/ProductCardList';
import { NotificationList } from '@/03_widgets/NotificationList/ui/NotificationList';
import { Loader } from '@/06_shared/ui/Loader/Loader';
import { NotificationDto } from '@/05_entities/notification/model/types';
import { useProfileCategoryData } from './module/useProfileCategoryData';
import css from './ProfileCategory.module.css';

const Products = ({ products, notifications, category }: { products: ProductPreviewCardDto[], notifications: NotificationDto[], category: ProductCategory }) => {
    if (category === ProductCategory.Notifications) {
        return <NotificationList notifications={notifications} />;
    }
    return (
        <ProductCardList
            products={products}
            productCardActionsSlot={(productId: number) => <AddToWishlistIcon productId={productId} />}
        />
    );
};

export const ProfileCategory = () => {
    const { id: profileId } = useParams<{ id: string }>();
    const parsedProfileId = profileId ? parseInt(profileId, 10) : null;
    const currentUserId = useSelector((state: RootState) => state.session.userId);

    const isMyProfile = parsedProfileId === currentUserId;

    const categoriesToShow = useMemo(() => {
        if (isMyProfile) {
            return [
                ProductCategory.UserProducts,
                ProductCategory.Favorites,
                ProductCategory.ToDo,
                ProductCategory.Notifications,
                ProductCategory.Archive,
            ];
        }
        return [ProductCategory.UserProducts, ProductCategory.Archive];
    }, [isMyProfile]);

    const [currentCategory, setCurrentCategory] = useState<ProductCategory>(categoriesToShow[0]);

    const { isLoading, productResults, notificationResults, refetch } = useProfileCategoryData(
        currentCategory,
        parsedProfileId,
        currentUserId
    );

    const handleCategoryChange = (category: ProductCategory) => {
        if (category === currentCategory) {
            refetch();
        } else {
            setCurrentCategory(category);
        }
    };

    const isNotifications = currentCategory === ProductCategory.Notifications;
    const isEmpty = isNotifications ? notificationResults.length === 0 : productResults.length === 0;

    return (
        <>
            <ProductFilterButtonsProfile
                currentCategory={currentCategory}
                categories={categoriesToShow}
                onCategoryChange={handleCategoryChange}
            />
            {isLoading ? (
                <Loader />
            ) : (
                isEmpty ? (
                    <div className={css.emptyMessage}>Тут пока ничего нет</div>
                ) : (
                    <Products
                        products={productResults}
                        notifications={notificationResults}
                        category={currentCategory}
                    />
                )
            )}
        </>
    );
};