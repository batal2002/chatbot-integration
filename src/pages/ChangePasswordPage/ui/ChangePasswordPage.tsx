import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import s from './ChangePasswordPage.module.scss';
import { Logo } from '@/shared/ui/Logo/Logo';
import { ChangePasswordForm } from '@/features/ChangePasswordForm';

export const ChangePasswordPage: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={s.ChangePasswordPage}>
            <Logo />

            <ChangePasswordForm />

            <span className={s.span}>
                <Trans i18nKey="no_account">
                    Нет аккаунта?{' '}
                    <Link className={s.link} to="/registration">
                        Зарегистрируйтесь
                    </Link>
                </Trans>
            </span>
        </div>
    );
};
