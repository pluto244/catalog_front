import {
    createSlice,
    createSelector,
    type PayloadAction,
} from '@reduxjs/toolkit';
import type { ProductId } from '@/05_entities/product';
import { RootState } from '@/01_app/AppStore';

type WishlistSliceState = {
    products: Record<ProductId, boolean>;
};

const initialState: WishlistSliceState = {
    products: {},
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearWishlistData: (state) => {
            state.products = {};
        },
        toggleWishlistProduct: (state, action: PayloadAction<ProductId>) => {
            if (state.products[action.payload]) {
                delete state.products[action.payload];
            } else {
                state.products[action.payload] = true;
            }
        },
    },
});

export const selectIsInWishlist = createSelector(
    (state: RootState) => state.wishlist.products,
    (_: RootState, productId: ProductId) => productId,
    (products, productId): boolean => Boolean(products[productId]),
);

export const selectProductIdsInWishlist = createSelector(
    (state: RootState) => state.wishlist.products,
    (products) =>
        Object.keys(products)
            .filter((id) => products[id as unknown as ProductId])
            .map((id) => Number(id) as ProductId),
);

export const { toggleWishlistProduct, clearWishlistData } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
