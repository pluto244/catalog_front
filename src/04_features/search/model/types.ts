import { ProductPreviewCardDto } from '@/05_entities/product/model/types';

export type InputSearchProps = {
    onApiResponse: (data: ProductPreviewCardDto[]) => void;
};
