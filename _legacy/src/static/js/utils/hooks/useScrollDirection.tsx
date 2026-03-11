// Libs
import { useEffect, useState } from 'react';

// Utils

// Helpers

// Component
const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

    let prevScrollY: number;

    useEffect(() => {
        const onScroll = () => {
            if (!prevScrollY) { prevScrollY = 0; }

            setScrollDirection(prevScrollY < window.pageYOffset ? 'down' : 'up');
            prevScrollY = window.pageYOffset;
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return scrollDirection;
};

export default useScrollDirection;
