import { ProductCard } from '@/05_entities/product'
import css from './ProductsCard.module.css'
import { ProductId, ProductPreviewCardDto, Status } from "@/05_entities/product/model/types"
import { Roles } from "@/05_entities/user/api/types"
import { ReactNode, useCallback } from "react"
import { useSelector } from "react-redux"



type ProductCardListType = {
    products: ProductPreviewCardDto[]
    productCardActionsSlot?: (productId: ProductId) => ReactNode
}





export function ProductCardList(props: ProductCardListType) {
    const { products, productCardActionsSlot } = props
    const userId = useSelector((state: RootState) => state.session.userId);
    const userRole = useSelector((state: RootState) => state.session.role);
    const isAdmin = userRole === Roles.ROLE_ADMIN;

    const getActionSlot = useCallback(
        (product: ProductPreviewCardDto) => {
            if (productCardActionsSlot) {
                if (((userId !== product.ownerId) || (isAdmin)) && (userRole === Roles.ROLE_USER)) {
                    return productCardActionsSlot(product.id);
                }
            }
            return null;
        },
        [productCardActionsSlot, userId, userRole, isAdmin]
    );

    const getInfoSlot = useCallback(
        (product: ProductPreviewCardDto) => {
            if (product.status === Status.MODERATION_DENIED) {
                return (
                    <span className={css.productCardInfoSpan}>
                        Требует изменений
                    </span>
                );
            }
            return null;
        },
        []
    );

    
    return (
        <div className={css.productListWrapper}>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    actionSlot={getActionSlot(product)}
                    info={getInfoSlot(product)}
                />
            ))}
        </div>
    )
}
