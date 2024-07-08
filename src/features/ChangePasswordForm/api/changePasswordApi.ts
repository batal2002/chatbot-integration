import { noAuthApi } from '@/shared/api/noAuthApi';
import { ChangePasswordFormProps } from '@/features/ChangePasswordForm/model/types/changePassword';

interface ChangePasswordResponse {
    detail: string;
}

interface ChangePasswordArgs extends ChangePasswordFormProps {
    uid: string;
    token: string;
}

const changePasswordApi = noAuthApi.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation<
            ChangePasswordResponse,
            ChangePasswordArgs
        >({
            query: (data) => ({
                url: '/auth/password/reset/confirm',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useChangePasswordMutation } = changePasswordApi;
