import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddMemberModal } from '@/features/AddMember/ui/AddMemberModal/AddMemberModal';
import { Button } from '@/shared/ui/Button/Button';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

interface AddMemberButtonProps {
    className?: string;
}

export const AddMemberButton: FC<AddMemberButtonProps> = (props) => {
    const { className } = props;
    const { isTablet } = useScreenDetector();
    const [roleModal, setRoleModal] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <Button
                className={className}
                variant="outline"
                onClick={() => setRoleModal(true)}
                size={isTablet ? 's' : 'm'}
            >
                {t('Добавить участников')}
            </Button>

            {roleModal && (
                <AddMemberModal
                    open={roleModal}
                    onClose={() => setRoleModal(false)}
                />
            )}
        </>
    );
};
