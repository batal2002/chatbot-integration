import { Model } from '@/shared/model/types/model';

export interface Integration {
    id: number;
    group: string;
    name: string;
    slug: string;
    is_active: boolean;
}
export interface UserIntegration {
    id: number;
    integration: {
        id: number;
        group: string;
        name: string;
        slug: string;
        isActive: boolean;
    };
    external_id: string;
    description: string;
    model: Model;
    settings: {
        token?: string;
    };
    name: string;
    is_active: boolean;
}

export interface PostIntegration {
    integration_id: number;
    model_id: number;
    name: string;
    settings: { token: string };
}
export interface PatchIntegration {
    id: number;
    data: PostIntegration;
}
