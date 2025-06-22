import React, { useCallback } from 'react'
import type { ProductId } from '@/05_entities/product'
import { selectIsInWishlist, toggleWishlistProduct } from '@/05_entities/wishlist'
import css from './AddToWishlistIcon.module.css';
import { Icon } from '@/06_shared/ui/Icon/Icon'
import { useAppDispatch, useAppSelector } from '@/06_shared/model/hooks'

type Props = {
    productId: ProductId
}

export function AddToWishlistIcon({ productId }: Props) {
    const isInWishlist = useAppSelector(state => selectIsInWishlist(state, productId));

    const dispatch = useAppDispatch();

    const onClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            e.preventDefault();
            dispatch(toggleWishlistProduct(productId));
        },
        [dispatch, productId],
    );

    return (
        <Icon onClick={onClick} className={css.iconStyle} type={isInWishlist ? 'activeHeart' : 'heart'} />
    );
}