import { Status } from '@/05_entities/product/model/types';
import { Roles } from '@/05_entities/user/api/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/01_app/AppStore';

export type ProductApiResponse = {
    id: number;
    ownerId: number;
    nameOfOwner: string;
    title: string;
    // status: 'ON_MODERATION' | 'APPROVED' | 'ARCHIVED' | 'MODERATION_DENIED';
    status: Status;
    emailOFSupport: string;
    linkToWebSite: string;
    description: string;
    category: string;
    timeOfLastApproval: string | null;
};

export type NotificationResponse = {
    id: number;
    userId: number;
    productId: number;
    message: string;
    timestamp: string;
};

export type UserApiResponse = {
    id: number;
    name: string;
    email: string;
    idOfFollowedProductsList: number[];
    // role: 'ROLE_ADMIN' | 'ROLE_USER';
    role: Roles;
};

export type AddProductBodyRequest = {
    title: string;
    emailOFSupport: string;
    linkToWebSite: string;
    description: string;
    category: string;
};

export type EditProductBodyRequest = {
    id: number;
    title: string;
    emailOFSupport: string;
    linkToWebSite: string;
    description: string;
    category: string;
};


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<void, { email: string, password: string }>({
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
        getAllProducts: builder.query<ProductApiResponse[], void>({
            query: () => '/products/all_approved',
        }),
        getProductById: builder.query<ProductApiResponse, number>({
            query: (id) => `/products/${id}`,
        }),
        addProduct: builder.mutation<ProductApiResponse, AddProductBodyRequest>({
            query: (product) => ({
                url: '/products/add',
                method: 'POST',
                body: product,
            }),
        }),
        editProduct: builder.mutation<ProductApiResponse, EditProductBodyRequest>({
            query: (product) => ({
                url: '/products/edit',
                method: 'PUT',
                body: product,
            }),
        }),
        getUserById: builder.query<UserApiResponse, number>({
            query: (id) => `/users/${id}`,
        }),
        addUser: builder.mutation<UserApiResponse, Partial<UserApiResponse>>({
            query: (user) => ({
                url: '/users/add',
                method: 'POST',
                body: user,
            }),
        }),
        getNotifications: builder.query<NotificationResponse[], void>({
            query: () => '/notifications', 
        }),
    }),
});

export const {
    useLoginMutation,
    useLazyGetMeQuery,
    useGetMeQuery,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useEditProductMutation,
    useGetUserByIdQuery,
    useAddUserMutation,
    useGetNotificationsQuery,  
} = api;
