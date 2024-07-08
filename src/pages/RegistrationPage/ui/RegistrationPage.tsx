import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import s from './RegistrationPage.module.scss';
import { Logo } from '@/shared/ui/Logo/Logo';
import { RegistrationForm } from '@/features/RegistrationForm';

export const RegistrationPage: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={s.RegistrationPage}>
            <Logo />

            <RegistrationForm />

            <span className={s.span}>
                <Trans i18nKey="already_have_an_account">
                    Уже есть аккаунт?{' '}
                    <Link className={s.link} to="/login">
                        Войдите
                    </Link>
                </Trans>
            </span>
        </div>
    );
};
