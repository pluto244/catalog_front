import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ProductId } from '@/05_entities/product';
import {
  selectIsInWishlist,
  selectProductIdsInWishlist,
  toggleWishlistProduct,
} from '@/05_entities/wishlist';
import { wishlistApi } from '@/05_entities/wishlist';
import type { RootState } from '@/01_app/AppStore';

export const toggleWishlistProductThunk = createAsyncThunk<
  void,
  ProductId,
  { state: RootState }
>(
  'wishlist/toggleWishlistProduct',
  async (productId: ProductId, { dispatch, getState }) => {
    const state = getState();
    const productsIds = selectProductIdsInWishlist(state);
    const isInWishlist = selectIsInWishlist(state, productId);


    dispatch(toggleWishlistProduct(productId));

    try {
      const nextProductsInWishlistIds = isInWishlist
        ? productsIds.filter(id => id !== productId)
        : productsIds.concat(productId);

      await dispatch(
        wishlistApi.endpoints.addToWishlist.initiate(
          nextProductsInWishlistIds,
          { fixedCacheKey: 'shared-add-to-wishlist' },
        ),
      ).unwrap();
    } catch {
      dispatch(toggleWishlistProduct(productId));
    }
  },
);
