// Libs
import { useEffect } from 'react';

// Utils
import registerServiceWorker from '../registerServiceWorker';

// Helpers
const onBeforeInstallPrompt = (e: any) => {
    setTimeout(() => {
        e.prompt();
    }, 1000);
};

// Component
const useServiceWorker = (): null => {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') { return; }

        window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);


        registerServiceWorker();

        return () => window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    }, []);

    return null;
};

export default useServiceWorker;
