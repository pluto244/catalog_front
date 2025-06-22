import React, { useCallback } from 'react'
import type { ProductId } from '@/05_entities/product'
import { selectIsInWishlist, toggleWishlistProduct } from '@/05_entities/wishlist'
import { useAppDispatch, useAppSelector } from '@/06_shared/model/hooks'
import { Button } from '@/06_shared/ui/Button/Button';

type Props = {
    productId: ProductId
}

export function AddToWishlistButton({ productId }: Props) {
    const isInWishlist = useAppSelector(state => selectIsInWishlist(state, productId));

    const dispatch = useAppDispatch();

    const onClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            dispatch(toggleWishlistProduct(productId));
        },
        [dispatch, productId],
    );

    return (
        <Button onClick={onClick}>{isInWishlist ? 'Отписаться' : 'Подписаться'}</Button>
    );
}