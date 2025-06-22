import { ProductPreviewCardDto } from '@/05_entities/product/model/types';
import type { WishlistDto } from '../api/types';

export function mapWishlist(dto: WishlistDto): ProductPreviewCardDto[] {
    return dto.map(product => product);
}
