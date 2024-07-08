import { LoginFormData } from '@/features/LoginForm/model/types/login';
import { noAuthApi } from '@/shared/api/noAuthApi';
import { User } from '@/entities/User';

interface Login {
    user: User;
    access: string;
    access_expiration: string;
    refresh: string;
    refresh_expiration: string;
}

const loginApi = noAuthApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<Login, LoginFormData>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;
