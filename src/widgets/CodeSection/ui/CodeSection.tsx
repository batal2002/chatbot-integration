import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import Copy from 'shared/assets/icons/copy.svg';
import { useTranslation } from 'react-i18next';
import s from './CodeSection.module.scss';
import { IconButton } from '@/shared/ui/IconButton/IconButton';

interface CodeSectionProps {
    className?: string;
}

const script =
    '<script type="text/javascript">\n' +
    '  (function(d, t) {\n' +
    '      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];\n' +
    '      v.onload = function() {\n' +
    '        window.voiceflow.chat.load({\n' +
    "          verify: { projectID: '65d1df7a4d3dfa08cbd296a3' },\n" +
    "          url: 'https://general-runtime.voiceflow.com',\n" +
    "          versionID: 'production'\n" +
    '        });\n' +
    '      }\n' +
    '      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; .parentNode.insertBefore(v, s);\n' +
    "  })(document, 'script');\n" +
    '</script>';

const tabs = [
    { id: 0, title: 'cURL' },
    { id: 1, title: 'Node.js' },
    { id: 2, title: 'Python' },
];

export const CodeSection: FC<CodeSectionProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState(0);
    const [copy, setCopy] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const onCopy = () => {
        navigator.clipboard.writeText(script).then(() => {
            setCopy(true);
        });
    };

    useEffect(() => {
        if (copy) {
            timerRef.current = setTimeout(() => {
                setCopy(false);
            }, 1000);
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [copy]);

    return (
        <div className={classNames(s.CodeSection, {}, [className])}>
            <h4 className={s.title}>API Call Examples</h4>
            <div className={s.wrapper}>
                <div className={s.header}>
                    <div className={s.tabs}>
                        {tabs.map(({ id, title }) => (
                            <button
                                key={id}
                                type="button"
                                className={classNames(
                                    s.tab,
                                    { [s.active]: id === currentTab },
                                    [],
                                )}
                                onClick={() => setCurrentTab(id)}
                            >
                                {title}
                            </button>
                        ))}
                    </div>
                    <div className={s.copyWrapper}>
                        {copy && (
                            <span className={s.tag}>{t('Скопировано')}</span>
                        )}
                        <IconButton
                            onClick={onCopy}
                            color="dark"
                            icon={<Copy />}
                        />
                    </div>
                </div>
                <div
                    className={s.codeWrapper}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    <pre className={s.pre}>
                        <code className={s.code}>{script}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};
