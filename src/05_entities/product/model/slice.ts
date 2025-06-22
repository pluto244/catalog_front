import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductPreviewCardDto, ProductId, Status } from '@/05_entities/product/model/types';

interface ProductState {
    products: ProductPreviewCardDto[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    status: 'idle',
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.status = 'loading';
        },
        fetchProductsSuccess(state, action: PayloadAction<ProductPreviewCardDto[]>) {
            state.products = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.status = 'failed';
            state.error = action.payload;
        },
        updateProductStatus(state, action: PayloadAction<{ id: ProductId; status: Status }>) {
            const { id, status } = action.payload;
            const product = state.products.find(product => product.id === id);
            if (product) {
                product.status = status;
            }
        },
        addProduct(state, action: PayloadAction<ProductPreviewCardDto>) {
            state.products.push(action.payload);
        },
        removeProduct(state, action: PayloadAction<ProductId>) {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    updateProductStatus,
    addProduct,
    removeProduct,
} = productSlice.actions;

export default productSlice.reducer;
