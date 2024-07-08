import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import s from './ApiKnowledgeBasePage.module.scss';
import { Section } from '@/shared/ui/Section/Section';
import { KeyList } from '@/widgets/KeyList';
import { KeyItem } from '@/entities/KeyItem';
import { AddKeyButton } from '@/features/AddKey';
import { CodeSection } from '@/widgets/CodeSection';

const keys = [
    {
        id: 0,
        name: 'keyName',
        token: 'u4KolF0l9XTLC7Oyl1DR537382rhv8432',
    },
    {
        id: 1,
        name: 'keyName12',
        token: 'u4KolF0l9XTLC7Oyl1DR537382rhv8432',
    },
];

export const ApiKnowledgeBasePage: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={s.ApiProjectPage}>
            <Section>
                <KeyList>
                    {keys.map(({ id, name, token }) => (
                        <KeyItem key={id} name={name} token={token} />
                    ))}
                </KeyList>
            </Section>
            <AddKeyButton />
            <Section>
                <CodeSection />
            </Section>
        </div>
    );
};
