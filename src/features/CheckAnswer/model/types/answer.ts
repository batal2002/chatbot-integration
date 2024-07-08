import { InferType } from 'yup';
import { answerSchema } from '../../lib/validationSchema/answerSchema';

export interface CheckAnswerModalProps {
    onClose: () => void;
    open: boolean;
}

export type CheckAnswerFormData = InferType<typeof answerSchema>;
