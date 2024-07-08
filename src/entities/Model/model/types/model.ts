export interface AiModel {
    id: number;
    name: string;
}

export interface PatchModelQuery {
    id: number;
    data: {
        name?: string;
        prompt_id?: number;
        ai_model_id?: number;
        dataset_id?: number;
        use_chat_history?: boolean;
    };
}
