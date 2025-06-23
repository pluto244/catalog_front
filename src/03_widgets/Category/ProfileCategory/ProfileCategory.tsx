import React, { useState } from 'react';
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

export const ProfileCategory: React.FC = () => {
    const { id: profileId } = useParams<{ id: string }>();
    const currentUserId = useSelector((state: RootState) => state.session.userId);
    const parsedProfileId = profileId ? parseInt(profileId, 10) : null;

    const isOwnProfile = currentUserId === parsedProfileId;

    const categoriesToShow = [
        ProductCategory.UserProducts,
        ...(isOwnProfile ? [ProductCategory.Favorites, ProductCategory.ToDo, ProductCategory.Notifications] : []),
        ProductCategory.Archive,
    ];

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

    return (
        <>
            <ProductFilterButtonsProfile
                currentCategory={currentCategory}
                categories={categoriesToShow}
                onCategoryChange={handleCategoryChange}
            />
            {isLoading ? <Loader/> :
                <Products
                    currentCategory={currentCategory}
                    productResults={productResults}
                    notificationResults={notificationResults}
                />
            }
        </>
    );
};

interface ProductsProps {
    currentCategory: ProductCategory;
    productResults: ProductPreviewCardDto[];
    notificationResults: NotificationDto[];
}

const Products: React.FC<ProductsProps> = ({ currentCategory, productResults, notificationResults }) => {
    if (currentCategory === ProductCategory.Notifications) {
        return <NotificationList notifications={notificationResults} />;
    }
    
    return (
        <ProductCardList
            products={productResults}
            productCardActionsSlot={(productId: number) => <AddToWishlistIcon productId={productId} />}
        />
    );
};