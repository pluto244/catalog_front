import React from 'react';
import type { ProductId } from '@/05_entities/product';
import { useAppSelector } from '@/06_shared/model/hooks';
import { Button } from '@/06_shared/ui/Button/Button';
import {
    useSubscribeToProductMutation,
    useUnsubscribeFromProductMutation
} from '@/06_shared/api/api';

type Props = {
    productId: ProductId;
};

export function AddToWishlistButton({ productId }: Props) {
    const followedProductIds = useAppSelector((state) => state.session.followedProductIds) || [];
    const isInWishlist = followedProductIds.includes(productId);

    const [subscribe, { isLoading: isSubscribing }] = useSubscribeToProductMutation();
    const [unsubscribe, { isLoading: isUnsubscribing }] = useUnsubscribeFromProductMutation();
    const isLoading = isSubscribing || isUnsubscribing;

    const handleClick = () => {
        if (isLoading) return;

        if (isInWishlist) {
            unsubscribe(productId);
        } else {
            subscribe(productId);
        }
    };

    return (
        <Button onClick={handleClick} isLoading={isLoading}>
            {isInWishlist ? 'Отписаться' : 'Подписаться'}
        </Button>
    );
}