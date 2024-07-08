import { RegistrationFormData } from '@/features/RegistrationForm/model/types/registration';
import { noAuthApi } from '@/shared/api/noAuthApi';

interface RegistrationResponse {
    detail: string;
}

const registrationApi = noAuthApi.injectEndpoints({
    endpoints: (build) => ({
        registration: build.mutation<
            RegistrationResponse,
            RegistrationFormData
        >({
            query: (data) => ({
                url: '/auth/registration',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useRegistrationMutation } = registrationApi;
