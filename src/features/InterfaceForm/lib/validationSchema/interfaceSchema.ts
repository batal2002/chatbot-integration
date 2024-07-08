import { boolean, mixed, object, string } from 'yup';

export const interfaceSchema = object({
    welcomeMessage: string().trim().required(),
    suggestedPosts: string().trim(),
    placeholder: string().trim(),
    displayName: string().trim().required(),
    theme: object({
        value: string().required(),
        title: string().required(),
    }),
    profileImage: mixed<File>().when('withoutProfileImage', {
        is: true,
        then: (field) => field.test((value) => value instanceof File),
    }),
    withoutProfileImage: boolean(),
    messageColor: string(),
    buttonPosition: object({
        value: string().required(),
        title: string().required(),
    }),
    chatbotIcon: mixed<File>().when('withoutChatbotIcon', {
        is: true,
        then: (field) =>
            field.test((value) => value instanceof File).optional(),
    }),
    withoutChatbotIcon: boolean(),
    buttonColor: string(),
});
