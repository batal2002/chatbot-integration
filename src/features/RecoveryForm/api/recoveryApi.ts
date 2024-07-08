import { noAuthApi } from '@/shared/api/noAuthApi';
import { RecoveryFormData } from '@/features/RecoveryForm/model/types/recovery';

interface ResetPassword {
    detail: string;
}

const recoveryApi = noAuthApi.injectEndpoints({
    endpoints: (build) => ({
        resetPassword: build.mutation<ResetPassword, RecoveryFormData>({
            query: (data) => ({
                url: '/auth/password/reset',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useResetPasswordMutation } = recoveryApi;
