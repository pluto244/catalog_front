import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductId, ProductMainPageCategory } from '@/05_entities/product/model/types';
import { AddToWishlistIcon } from '@/04_features/wishlist/addToWishlist/ui/AddToWishlistIcon/AddToWishlistIcon';
import { ProductFilterButtons } from '@/04_features/product/ui/ProductFilterButtons';
import { InputSearch } from '@/04_features/search';
import { ProductCardList } from '@/03_widgets/ProductCardList/ui/ProductCardList';
import { useGetAllProductsQuery, useGetFollowedProductsQuery, useSearchProductsByTitleQuery } from '@/06_shared/api/api';
import { Loader } from '@/06_shared/ui/Loader/Loader';
import { useDebounce } from '@/06_shared/lib/useDebounce';
import { RootState } from '@/01_app/AppStore';

export const MainCategoryWidget: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentCategory, setCurrentCategory] = useState<ProductMainPageCategory>(ProductMainPageCategory.All);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const currentUserId = useSelector((state: RootState) => state.session.userId);

    const isFavoritesCategory = currentCategory === ProductMainPageCategory.Favorites;

    const { data: allProducts, isLoading: isLoadingAll } = useGetAllProductsQuery(undefined, {
        skip: isFavoritesCategory || !!debouncedSearchQuery
    });
    const { data: searchedProducts, isLoading: isLoadingSearch } = useSearchProductsByTitleQuery(debouncedSearchQuery, {
        skip: !debouncedSearchQuery
    });
    const { data: followedProducts, isLoading: isLoadingFollowed } = useGetFollowedProductsQuery(currentUserId!, {
        skip: !isFavoritesCategory || !currentUserId
    });

    const isLoading = isLoadingAll || isLoadingSearch || isLoadingFollowed;
    
    const products = isFavoritesCategory ? followedProducts : (debouncedSearchQuery ? searchedProducts : allProducts);

    return (
        <>
            <InputSearch onSearch={setSearchQuery} />

            <ProductFilterButtons
                currentCategory={currentCategory}
                categories={[ProductMainPageCategory.All, ProductMainPageCategory.Favorites]}
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
