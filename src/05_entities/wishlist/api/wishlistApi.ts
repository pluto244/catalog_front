import mockProducts from '@/06_shared/lib/server/__mocks__/productsCards.json';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { WishlistDto } from './types';
import { mapWishlist } from '../lib/mapWishList';
import { ProductPreviewCardDto } from '@/05_entities/product/model/types';

const convertToProductPreviewCardDto = (product: any): ProductPreviewCardDto => ({
    ...product
});

let mockWishlist: WishlistDto = mockProducts
    .filter((product: any) => [14, 3, 7].includes(product.id))
    .map(convertToProductPreviewCardDto) as WishlistDto;

export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (build) => ({
        wishlistProducts: build.query<ProductPreviewCardDto[], void>({
            query: () => `/wishlist/products`,
            transformResponse: () => mapWishlist(mockWishlist),
        }),
        addToWishlist: build.mutation<void, number[]>({
            query: (productsInWishlistIds) => ({
                url: `/wishlist/products`,
                method: 'PATCH',
                body: productsInWishlistIds,
            }),
            async onQueryStarted(productsInWishlistIds, { queryFulfilled }) {
                try {
                    mockWishlist = mockProducts
                        .filter((product: any) => productsInWishlistIds.includes(product.id))
                        .map(convertToProductPreviewCardDto) as WishlistDto;
                    await queryFulfilled;
                } catch (error) {
                    console.error('Error updating wishlist:', error);
                }
            },
        }),
    }),
});


export const { useWishlistProductsQuery, useAddToWishlistMutation } = wishlistApi;
