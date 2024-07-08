interface ApiError {
    [key: string]: string[] | string;
}

export type ApiErrorData = ApiError & {
    error_code: ApiError;
};

export interface ApiErrorResponse {
    data: ApiErrorData;
    status: number;
}
