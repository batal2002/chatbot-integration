import classNames from 'classnames';
import { FC, useId, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useTranslation } from 'react-i18next';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';
import s from './ColorPicker.module.scss';
import './ColorPicker.scss';
import { Button } from '@/shared/ui/Button/Button';

interface ColorPickerProps {
    className?: string;
    label?: string;
    color?: string;
    onChange: (value: string) => void;
    reset?: () => void;
}

export const ColorPicker: FC<ColorPickerProps> = (props) => {
    const { className, label, color, onChange, reset } = props;
    const { t } = useTranslation();
    const id = useId();
    const [open, setOpen] = useState(false);

    const ref = useOutsideClick({
        open,
        onClose: () => setOpen(false),
    });

    return (
        <div className={classNames(s.ColorPicker, {}, [className])}>
            <div className={s.header}>
                {label && (
                    <label className={s.label} htmlFor={id}>
                        {label}
                    </label>
                )}
                {reset && (
                    <Button variant="clear" onClick={reset}>
                        {t('Сбросить')}
                    </Button>
                )}
            </div>
            <div ref={ref} className={s.pickerWrapper}>
                <button
                    type="button"
                    id={id}
                    onClick={() => setOpen(!open)}
                    className={s.button}
                >
                    <div
                        className={s.color}
                        style={{ backgroundColor: color }}
                    />
                    {color}
                </button>
                {open && (
                    <div className={s.popup}>
                        <section className="colorPicker">
                            <HexColorPicker color={color} onChange={onChange} />
                        </section>
                        <div className={s.pickerFooter}>
                            <span>Hex</span>
                            <div className={s.pickerColor}>
                                {color}
                                <div
                                    className={s.color}
                                    style={{ backgroundColor: color }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
