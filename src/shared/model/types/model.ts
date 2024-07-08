export interface Model {
    id: number;
    name: string;
    prompt: {
        id: number;
        description: string;
        header: string;
        footer: string;
        tags: string;
        public: boolean;
        name: string;
    };
    ai_model: {
        id: number;
        name: string;
    };
    dataset: {
        id: number;
        name: string;
        creativity: number;
        delimiter: string;
        attachments: [
            {
                id: number;
                name: string;
                file: string;
            },
        ];
    };
    use_chat_history: boolean;
}
