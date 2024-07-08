import { useEffect, useState } from 'react';

export const useSensitiveColor = (hex: string | undefined) => {
    const [sensitiveColor, setSensitiveColor] = useState('light');

    useEffect(() => {
        if (hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);

            const color =
                r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'dark' : 'light';

            setSensitiveColor(color);
        }
    }, [hex]);

    return sensitiveColor;
};
