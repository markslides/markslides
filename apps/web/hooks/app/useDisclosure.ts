'use client';

import { useState, useCallback } from 'react';

function useDisclosure() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen((prevIsOpen) => {
            return !prevIsOpen;
        });
    }, []);

    return { isOpen, onOpen, onClose, toggle };
}

export default useDisclosure;
