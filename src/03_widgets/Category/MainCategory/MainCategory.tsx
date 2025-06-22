import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProductId, ProductMainPageCategory, ProductPreviewCardDto } from '@/05_entities/product/model/types';
import { RootState } from '@/01_app/AppStore';
import { selectProductIdsInWishlist } from '@/05_entities/wishlist';
import { AddToWishlistIcon } from '@/04_features/wishlist/addToWishlist/ui/AddToWishlistIcon/AddToWishlistIcon';
import { ProductFilterButtons } from '@/04_features/product/ui/ProductFilterButtons';
import { fetchSearchResults, InputSearch } from '@/04_features/search';
import { ProductCardList } from '@/03_widgets/ProductCardList/ui/ProductCardList';
import { filterFavoriteProducts } from './module/filterFavoriteProducts';


export const MainCategoryWidget: React.FC = () => {
    const [products, setProducts] = useState<ProductPreviewCardDto[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<ProductPreviewCardDto[]>([]);
    const [currentCategory, setCurrentCategory] = useState<ProductMainPageCategory>(ProductMainPageCategory.All);
    const favoriteProductIds = useSelector(selectProductIdsInWishlist);

    const handleApiResponse = (data: ProductPreviewCardDto[]) => {
        setProducts(data);
    };

    const handleCategoryChange = (category: ProductMainPageCategory) => {
        setCurrentCategory(category);
    };
    
    useEffect(() => {
        fetchSearchResults().then(setProducts);
    }, []);

    useEffect(() => {
        let filtered = products;
        if (currentCategory === ProductMainPageCategory.Favorites) {
            filtered = filterFavoriteProducts(products, favoriteProductIds);
        }
        setDisplayedProducts(filtered);
    }, [currentCategory, products, favoriteProductIds]);
    
    return (
        <>
            <InputSearch
                onApiResponse={handleApiResponse}
            />

            <ProductFilterButtons
                currentCategory={currentCategory}
                categories={[ProductMainPageCategory.All, ProductMainPageCategory.Favorites]}
                onCategoryChange={handleCategoryChange}
            />

            <ProductCardList
                products={displayedProducts}
                productCardActionsSlot={(productId: ProductId) => <AddToWishlistIcon productId={productId} />}
            />
        </>
    );
};
