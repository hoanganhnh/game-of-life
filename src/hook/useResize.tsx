import { useState, useEffect } from 'react';


function useResize() {
    const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const [width, setWidth] = useState(getWidth());

    useEffect(() => {
        const resizeListener = () => {
            setWidth(getWidth());
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    return width;

}

export default useResize;