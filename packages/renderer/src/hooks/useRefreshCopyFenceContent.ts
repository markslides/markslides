import { useCallback } from 'react';

function useRefreshCopyFenceContent() {
    return useCallback(() => {
        const copyFenceContentButtonElems = Array.from(
            document.querySelectorAll('button.copy-fence-content')
        ) as HTMLButtonElement[];

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

        copyFenceContentButtonElems.forEach((elem) => {
            elem.addEventListener('click', handleClickCopyCodeButton);
        });

        return () => {
            copyFenceContentButtonElems.forEach((elem) => {
                elem.removeEventListener('click', handleClickCopyCodeButton);
            });
        };
    }, []);
}

export default useRefreshCopyFenceContent;
