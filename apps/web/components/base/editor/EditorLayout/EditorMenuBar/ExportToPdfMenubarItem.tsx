import { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MenubarItem } from '@markslides/ui/menu-bar';
import { useToast } from '@/components/ui/use-toast';

function ExportToPdfMenubarItem() {
    const { toast } = useToast();
    const marpitRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marpitElem = document.getElementsByClassName('marpit')[0];
        if (marpitElem) {
            marpitRef.current = marpitElem as HTMLDivElement;
        }
    }, []);

    const handlePrint = useReactToPrint({
        contentRef: marpitRef,
        documentTitle: 'Untitled',
    });

    return (
        <MenubarItem
            onClick={() => {
                if (!marpitRef.current) {
                    toast({
                        title: 'An error is occurred.',
                        duration: 3000,
                    });
                    return;
                }
                handlePrint();
            }}>
            Export as PDF
        </MenubarItem>
    );
}

export default ExportToPdfMenubarItem;
