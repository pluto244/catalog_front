import React from 'react';
import type { ProductId } from '@/05_entities/product';
import css from './AddToWishlistIcon.module.css';
import { Icon } from '@/06_shared/ui/Icon/Icon';
import { useAppSelector, useAppDispatch } from '@/06_shared/model/hooks';
import {
    useSubscribeToProductMutation,
    useUnsubscribeFromProductMutation
} from '@/06_shared/api/api';

type Props = {
    productId: ProductId;
};

export function AddToWishlistIcon({ productId }: Props) {
    const dispatch = useAppDispatch();
    const followedProductIds = useAppSelector((state) => state.session.followedProductIds) || [];
    const isInWishlist = followedProductIds.includes(productId);

    const [subscribe, { isLoading: isSubscribing }] = useSubscribeToProductMutation();
    const [unsubscribe, { isLoading: isUnsubscribing }] = useUnsubscribeFromProductMutation();
    const isLoading = isSubscribing || isUnsubscribing;

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (isLoading) return;

        if (isInWishlist) {
            unsubscribe(productId);
        } else {
            subscribe(productId);
        }
    };

    return (
        <Icon
            onClick={handleClick}
            className={css.iconStyle}
            type={isInWishlist ? 'activeHeart' : 'heart'}
        />
    );
}