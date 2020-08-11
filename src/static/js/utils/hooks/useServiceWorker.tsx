import { useEffect } from 'react';

import registerServiceWorker from '../registerServiceWorker';

const useServiceWorker = (): null => {
    useEffect((): void => {
        if (process.env.NODE_ENV !== 'production') { return; }

        registerServiceWorker();
    }, []);

    return null;
};

export default useServiceWorker;
