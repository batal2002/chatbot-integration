import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { ChangeTokenModal } from '@/features/ChangeToken/ui/ChangeTokenModal/ChangeTokenModal';
import { ChangeTokenButtonProps } from '@/features/ChangeToken/model/types/token';

export const ChangeTokenButton: FC<ChangeTokenButtonProps> = (props) => {
    const { data, isActiveIntegration, disabled } = props;
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <Button size="s" onClick={() => setOpen(true)} disabled={disabled}>
                {t('Управление')}
            </Button>

            {open && (
                <ChangeTokenModal
                    open={open}
                    onClose={() => setOpen(false)}
                    data={data}
                    isActiveIntegration={isActiveIntegration}
                />
            )}
        </>
    );
};
