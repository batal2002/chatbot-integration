export interface Prompt {
    id: number;
    description: string;
    header: string;
    footer: string;
    tags: string;
    public: boolean;
    name: string;
}

export interface PatchPromptArgs {
    id: number;
    data: Partial<Prompt>;
}
