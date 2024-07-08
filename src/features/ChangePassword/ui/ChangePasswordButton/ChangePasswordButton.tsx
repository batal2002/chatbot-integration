import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangePasswordModal } from '@/features/ChangePassword/ui/ChangePasswordModal/ChangePasswordModal';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Edit from '@/shared/assets/icons/edit.svg';

export const ChangePasswordButton: FC = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                icon={<Edit />}
                iconColor="dark"
            />

            {open && (
                <ChangePasswordModal
                    open={open}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};
