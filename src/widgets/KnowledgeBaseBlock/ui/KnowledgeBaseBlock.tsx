import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import s from './KnowledgeBaseBlock.module.scss';
import { Button } from '@/shared/ui/Button/Button';

interface KnowledgeBaseBlockProps {
    className?: string;
    formId?: string;
    isCreate?: boolean;
    isPosting?: boolean;
}

export const KnowledgeBaseBlock: FC<KnowledgeBaseBlockProps> = (props) => {
    const { className, formId, isCreate, isPosting } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(s.KnowledgeBaseBlock, {}, [className])}>
            {/* TODO: symbol counter */}
            {/* <div className={s.section}> */}
            {/*     <h4 className={s.title}>{t('Общее количество')}</h4> */}
            {/*     <ul className={s.list}> */}
            {/*         <span className={s.item}> */}
            {/*             72 970 / 400 000 {t(' макс')}. */}
            {/*         </span> */}
            {/*     </ul> */}
            {/* </div> */}
            {isCreate ? (
                <Button form={formId} type="submit" buttonWidth="auto" size="s">
                    {t('Создать чатбота')}
                </Button>
            ) : (
                <Button
                    form={formId}
                    type="submit"
                    buttonWidth="auto"
                    size="s"
                    disabled={isPosting}
                >
                    {t('Обучить чатбота')}
                </Button>
            )}
        </div>
    );
};
