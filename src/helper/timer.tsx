import { useEffect } from 'react';

export const useInterval = (callback: Function, isRunning: boolean): void => {
    useEffect(() => {
        if (isRunning) {
            const id = callback();
            return () => {
                clearInterval(id);
            };
        }
    }, [isRunning]);
};
