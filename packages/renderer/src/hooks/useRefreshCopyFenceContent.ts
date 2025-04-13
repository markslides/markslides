import { useCallback } from 'react';
import appMarp from '@/lib/marp/appMarp';

function useRefreshCopyFenceContent() {
    return useCallback(() => {
        // For mermaid
        appMarp.getDefaultInstance().markdown.mermaid.contentLoaded();

        // For copy fence content
        const copyFenceContentElems = Array.from(
            document.getElementsByClassName('copy-fence-content')
        ) as HTMLElement[];

        const handleClickCopyCodeButton = async (event: Event) => {
            event.stopPropagation();
            event.preventDefault();

            const elem = event.currentTarget as HTMLElement;
            const content = elem.dataset.content;
            if (!content) {
                return;
            }

            try {
                await navigator.clipboard.writeText(content);

                elem.classList.add('active');
                const timeoutId = setTimeout(() => {
                    elem.classList.remove('active');
                }, 2000);

                return () => {
                    clearTimeout(timeoutId);
                };
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        };

        copyFenceContentElems.forEach((elem) => {
            elem.addEventListener('click', handleClickCopyCodeButton);
        });

        return () => {
            copyFenceContentElems.forEach((elem) => {
                elem.removeEventListener('click', handleClickCopyCodeButton);
            });
        };
    }, []);
}

export default useRefreshCopyFenceContent;
