import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '@/entities/User';
import { ChangeNameFormData } from '@/features/ChangeName/model/types/email';

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserData: build.query<User, void>({
            query: () => `/auth/user`,
            providesTags: ['User'],
        }),
        patchUserData: build.mutation<void, ChangeNameFormData>({
            query: (data) => ({
                url: '/auth/user',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetUserDataQuery, usePatchUserDataMutation } = userApi;
