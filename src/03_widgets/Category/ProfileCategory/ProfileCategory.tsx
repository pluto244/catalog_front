import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProductPreviewCardDto } from '@/05_entities/product/model/types';
import { RootState } from '@/01_app/AppStore';
import { fetchArchiveProducts, fetchFavoriteProducts, fetchNotifications, fetchToDoProducts, fetchMainProducts } from '@/04_features/product/category/api/productFilterRequests';
import { selectProductIdsInWishlist } from '@/05_entities/wishlist';
import { AddToWishlistIcon } from '@/04_features/wishlist/addToWishlist/ui/AddToWishlistIcon/AddToWishlistIcon';
import { ProductCategory } from '@/05_entities/product/model/types';
import { useParams } from 'react-router-dom';
import { ProductFilterButtonsProfile } from '@/04_features/product/ui/ProductFilterButtonsProfile';
import { ProductCardList } from '@/03_widgets/ProductCardList/ui/ProductCardList';
import { NotificationDto } from '@/05_entities/notification/model/types';
import { NotificationList } from '@/03_widgets/NotificationList/ui/NotificationList';

export const ProfileCategory: React.FC = () => {
    const [productResults, setProductResults] = useState<ProductPreviewCardDto[]>([]);
    const [notificationResults, setNotificationResults] = useState<NotificationDto[]>([]);

    const { id: profileId } = useParams<{ id: string }>();
    const favoriteProductIds = useSelector(selectProductIdsInWishlist);
    const userId = useSelector((state: RootState) => state.session.userId);
    const parsedProfileId = profileId ? parseInt(profileId, 10) : null;

    let categoriesToShow: ProductCategory[];
    categoriesToShow = userId === parsedProfileId
        ? [ProductCategory.UserProducts, ProductCategory.ToDo, ProductCategory.Archive, ProductCategory.Notifications]
        : [ProductCategory.UserProducts, ProductCategory.Archive, ProductCategory.Notifications];

    const [currentCategory, setCurrentCategory] = useState<ProductCategory>(categoriesToShow[0]);

    const categoryFetchers: Record<ProductCategory, () => Promise<ProductPreviewCardDto[] | NotificationDto[]>> = {
        [ProductCategory.Favorites]: () => fetchFavoriteProducts(favoriteProductIds),
        [ProductCategory.ToDo]: () => userId ? fetchToDoProducts(userId) : Promise.resolve([]),
        [ProductCategory.Archive]: () => parsedProfileId ? fetchArchiveProducts(parsedProfileId) : Promise.resolve([]),
        [ProductCategory.UserProducts]: () => parsedProfileId ? fetchMainProducts(parsedProfileId) : Promise.resolve([]),
        [ProductCategory.Notifications]: () => fetchNotifications(),
    };

    useEffect(() => {
        const loadProducts = async () => {
            const fetchProducts = categoryFetchers[currentCategory];
            const loadedProducts = await fetchProducts();
            
            if (currentCategory === ProductCategory.Notifications) {
                setNotificationResults(loadedProducts as NotificationDto[]);
            } else {
                setProductResults(loadedProducts as ProductPreviewCardDto[]);
            }
        };

        loadProducts();
    }, [currentCategory, favoriteProductIds, userId, categoryFetchers]);

    const handleCategoryChange = (category: ProductCategory) => {
        setCurrentCategory(category);
    };

    return (
        <>
            <ProductFilterButtonsProfile
                currentCategory={currentCategory}
                categories={categoriesToShow}
                onCategoryChange={handleCategoryChange}
            />
            <Products 
                currentCategory={currentCategory} 
                productResults={productResults} 
                notificationResults={notificationResults} 
            />
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