import { Status } from '@/05_entities/product/model/types';
import { Roles } from '@/05_entities/user/api/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/01_app/AppStore';
import { NotificationDto } from '@/05_entities/notification/model/types';
import { updateFollowedIds } from '@/05_entities/session/sessionSlice';

export type ProductDto = {
    id: number;
    ownerId: number;
    nameOfOwner: string;
    title: string;
    status: Status;
    emailOfSupport: string;
    linkToWebSite: string;
    description: string;
    category: string;
    timeOfLastApproval: string | null;
};

export type ProductPreviewCardDto = {
    id: number;
    ownerId: number;
    title: string;
    nameOfOwner: string;
    description: string;
    category: string;
    status: Status;
    timeOfLastApproval: string | null;
}

export type IdsOfFollowedProductsDto = {
    productIds: number[];
}

export type NotificationResponse = {
    id: number;
    userId: number;
    productId: number;
    message: string;
};

export type UserApiResponse = {
    id: number;
    name: string;
    email: string;
    idOfFollowedProductsList: number[];
    role: Roles;
};

export type AddProductBodyRequest = {
    title: string;
    emailOfSupport: string;
    linkToWebSite: string;
    description: string;
    category: string;
};

export type EditProductBodyRequest = {
    id: number;
    title: string;
    emailOfSupport: string;
    linkToWebSite: string;
    description: string;
    category: string;
};

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['FollowedProducts'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<UserApiResponse, { email: string, password: string }>({
            query: (credentials) => {
                const body = new URLSearchParams();
                body.append('email', credentials.email);
                body.append('password', credentials.password);
                return {
                    url: '/users/login',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            },
        }),
        getMe: builder.query<UserApiResponse, void>({
            query: () => '/users/me',
        }),
        getAllProducts: builder.query<ProductPreviewCardDto[], void>({
            query: () => '/products/all_approved',
        }),
        getProductById: builder.query<ProductDto, number>({
            query: (id) => `/products/${id}`,
        }),
        searchProductsByTitle: builder.query<ProductPreviewCardDto[], string>({
            query: (title) => `/products/all_approved/title?title=${encodeURIComponent(title)}`,
        }),
        searchProductsByCategory: builder.query<ProductPreviewCardDto[], string>({
            query: (category) => `/products/all_approved/category?category=${encodeURIComponent(category)}`,
        }),
        searchProductsByTitleAndCategory: builder.query<ProductPreviewCardDto[], { title: string; category: string }>({
            query: ({ title, category }) => `/products/all_approved/title_and_category?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`,
        }),
        addProduct: builder.mutation<ProductDto, AddProductBodyRequest>({
            query: (product) => ({
                url: '/products/add',
                method: 'POST',
                body: product,
            }),
        }),
        editProduct: builder.mutation<ProductDto, EditProductBodyRequest>({
            query: (product) => ({
                url: '/products/edit',
                method: 'PUT',
                body: product,
            }),
        }),
        getUserProductsByStatus: builder.query<ProductPreviewCardDto[], { userId: number, status: Status }>({
            query: ({ userId, status }) => `/products/${userId}/status?status=${status}`,
        }),
        archiveProduct: builder.mutation<number, number>({
            query: (id) => ({
                url: `/products/archive/${id}`,
                method: 'POST',
            }),
        }),
        unarchiveProduct: builder.mutation<number, number>({
            query: (id) => ({
                url: `/products/unarchive/${id}`,
                method: 'POST',
            }),
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
        }),
        subscribeToProduct: builder.mutation<IdsOfFollowedProductsDto, number>({
            query: (id) => ({
                url: `/products/subscribe_on_product/${id}`,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateFollowedIds(data.productIds));
                } catch (error) {
                    console.error('Failed to subscribe', error);
                }
            },
        }),
        unsubscribeFromProduct: builder.mutation<IdsOfFollowedProductsDto, number>({
            query: (id) => ({
                url: `/products/unsubscribe_from_product/${id}`,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateFollowedIds(data.productIds));
                } catch (error) {
                    console.error('Failed to unsubscribe', error);
                }
            },
        }),
        getFollowedProducts: builder.query<ProductPreviewCardDto[], number>({
            query: (id) => `/products/all_approved/followed_by_user/${id}`,
        }),
        getUserById: builder.query<UserApiResponse, number>({
            query: (id) => `/users/${id}`,
        }),
        getUserByEmail: builder.query<UserApiResponse, string>({
            query: (email) => `/users/email?email=${email}`,
        }),
        editUser: builder.mutation<UserApiResponse, Partial<UserApiResponse>>({
            query: (user) => ({
                url: '/users/edit',
                method: 'PATCH',
                body: user,
            }),
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/users/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        addUser: builder.mutation<UserApiResponse, Partial<UserApiResponse>>({
            query: (user) => ({
                url: '/users/add',
                method: 'POST',
                body: user,
            }),
        }),
        getNotifications: builder.query<NotificationDto[], number>({
            query: (userId) => `/notifications/all/${userId}`,
        }),
    }),
});

export const {
    useLoginMutation,
    useLazyGetMeQuery,
    useGetMeQuery,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useSearchProductsByTitleQuery,
    useLazySearchProductsByTitleQuery,
    useSearchProductsByCategoryQuery,
    useLazySearchProductsByCategoryQuery,
    useSearchProductsByTitleAndCategoryQuery,
    useLazySearchProductsByTitleAndCategoryQuery,
    useAddProductMutation,
    useEditProductMutation,
    useGetUserProductsByStatusQuery,
    useLazyGetUserProductsByStatusQuery,
    useArchiveProductMutation,
    useUnarchiveProductMutation,
    useDeleteProductMutation,
    useSubscribeToProductMutation,
    useUnsubscribeFromProductMutation,
    useGetFollowedProductsQuery,
    useGetUserByIdQuery,
    useGetUserByEmailQuery,
    useLazyGetUserByEmailQuery,
    useEditUserMutation,
    useDeleteUserMutation,
    useAddUserMutation,
    useGetNotificationsQuery,  
} = api;
