import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductId, ProductMainPageCategory } from '@/05_entities/product/model/types';
import { AddToWishlistIcon } from '@/04_features/wishlist/addToWishlist/ui/AddToWishlistIcon/AddToWishlistIcon';
import { ProductFilterButtons } from '@/04_features/product/ui/ProductFilterButtons';
import { InputSearch } from '@/04_features/search';
import { ProductCardList } from '@/03_widgets/ProductCardList/ui/ProductCardList';
import { useGetAllProductsQuery, useGetFollowedProductsQuery, useGetModerationProductsQuery, useSearchProductsByTitleQuery } from '@/06_shared/api/api';
import { Loader } from '@/06_shared/ui/Loader/Loader';
import { useDebounce } from '@/06_shared/lib/useDebounce';
import { RootState } from '@/01_app/AppStore';
import { Roles } from '@/05_entities/user/api/types';

export const MainCategoryWidget: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { userId: currentUserId, role } = useSelector((state: RootState) => state.session);
    const isAdmin = role === Roles.ROLE_ADMIN;

    const [currentCategory, setCurrentCategory] = useState<ProductMainPageCategory>(
        isAdmin ? ProductMainPageCategory.Moderation : ProductMainPageCategory.All
    );
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const isFavoritesCategory = currentCategory === ProductMainPageCategory.Favorites;
    const isModerationCategory = currentCategory === ProductMainPageCategory.Moderation;

    const { data: allProducts, isLoading: isLoadingAll } = useGetAllProductsQuery(undefined, {
        skip: isFavoritesCategory || !!debouncedSearchQuery || isModerationCategory,
    });
    const { data: searchedProducts, isLoading: isLoadingSearch } = useSearchProductsByTitleQuery(debouncedSearchQuery, {
        skip: !debouncedSearchQuery,
    });
    const { data: followedProducts, isLoading: isLoadingFollowed } = useGetFollowedProductsQuery(currentUserId!, {
        skip: !isFavoritesCategory || !currentUserId,
    });
    const { data: moderationProducts, isLoading: isLoadingModeration } = useGetModerationProductsQuery(undefined, {
        skip: !isModerationCategory || !isAdmin,
    });
    
    const isLoading = isLoadingAll || isLoadingSearch || isLoadingFollowed || isLoadingModeration;

    const categories = useMemo(() => {
        if (isAdmin) {
            return [ProductMainPageCategory.Moderation];
        }
        return [ProductMainPageCategory.All, ProductMainPageCategory.Favorites];
    }, [isAdmin]);

    const products = useMemo(() => {
        if (isModerationCategory) return moderationProducts;
        if (isFavoritesCategory) return followedProducts;
        if (debouncedSearchQuery) return searchedProducts;
        return allProducts;
    }, [isModerationCategory, isFavoritesCategory, debouncedSearchQuery, moderationProducts, followedProducts, searchedProducts, allProducts]);

    return (
        <>
            <InputSearch onSearch={setSearchQuery} />

            <ProductFilterButtons
                currentCategory={currentCategory}
                categories={categories}
                onCategoryChange={setCurrentCategory}
            />
            {isLoading ? <Loader/> : (
                <ProductCardList
                    products={products || []}
                    productCardActionsSlot={(productId: ProductId) => <AddToWishlistIcon productId={productId} />}
                />
            )}
        </>
    );
};
