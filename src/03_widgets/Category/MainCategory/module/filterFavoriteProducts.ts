import { ProductPreviewCardDto, Status } from "@/05_entities/product/model/types";

export const filterFavoriteProducts = (productList: ProductPreviewCardDto[], wishlistListIds: number[]): ProductPreviewCardDto[] => {
    return productList.filter(product => (product.status === Status.APPROVED || 
            product.status === Status.ARCHIVED) && wishlistListIds.includes(product.id));
};
