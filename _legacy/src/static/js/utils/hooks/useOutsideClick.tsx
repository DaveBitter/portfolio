

import { useRef, useEffect } from 'react';

const useOutsideClick = (cb: Function) => {
    const elementInstance = useRef<HTMLElement>(null);

    const onDocumentClick = (event: any) => {
        if (!elementInstance?.current?.contains(event.target)) { cb(); }
    };

    useEffect(() => {
        document.addEventListener('click', onDocumentClick);

        return () => document.removeEventListener('click', onDocumentClick);
    }, []);

    return elementInstance;
};

export default useOutsideClick;
