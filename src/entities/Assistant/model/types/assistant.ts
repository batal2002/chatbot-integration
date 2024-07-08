import { Model } from '@/shared/model/types/model';

export interface Assistant {
    id: number;
    name: string;
    description: string;
    model: Model;
    avatar: {
        id: number;
        name: string;
    };
    updated_at: string;
    confidence_threshold: number;
    max_tokens: number;
}

export interface PatchAssistantQuery {
    id?: string;
    data: {
        name?: string;
        description?: string;
        model_id?: number;
        avatar_id?: number;
        confidence_threshold?: number;
        max_tokens?: number;
    };
}
