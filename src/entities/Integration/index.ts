export type { Integration } from './model/types/integration';

export {
    useGetIntegrationsDataQuery,
    useGetUserIntegrationsDataQuery,
    useCreateUserIntegrationMutation,
    usePatchUserIntegrationMutation,
    useDeleteUserIntegrationMutation,
} from './api/integrationsApi';
