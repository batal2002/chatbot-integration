import ReactDOM from 'react-dom/client';
import App from './app/App';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';
import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
);
