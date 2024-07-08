import { InferType } from 'yup';
import { tokenSchema } from '../../lib/validationSchema/tokenSchema';
import { Integration } from '@/entities/Integration';
import { UserIntegration } from '@/entities/Integration/model/types/integration';

export interface ChangeTokenButtonProps {
    data: Integration;
    isActiveIntegration?: UserIntegration;
    disabled?: boolean;
}
export interface ChangeTokenModalProps extends ChangeTokenButtonProps {
    className?: string;
    onClose: () => void;
    open: boolean;
}

export type ChangeTokenFormData = InferType<typeof tokenSchema>;
