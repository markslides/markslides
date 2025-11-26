import ReactToPrint from 'react-to-print';
import { MenubarItem } from '@markslides/ui/menu-bar';
import { useToast } from '@/components/ui/use-toast';

function ExportToPdfMenubarItem({ t }: { t: (key: string) => string }) {
    const { toast } = useToast();

    return (
        <ReactToPrint
            documentTitle={t('untitled')}
            trigger={() => {
                return <MenubarItem>{t('exportAsPDF')}</MenubarItem>;
            }}
            content={() => {
                const marpitElem = document.getElementsByClassName('marpit')[0];
                if (!marpitElem) {
                    toast({
                        title: 'An error is occurred.',
                        // description: 'Please try again later.',
                        // status: 'error',
                        // position: 'top',
                        duration: 3000,
                    });
                    return null;
                }

                return marpitElem;
            }}
        />
    );
}

export default ExportToPdfMenubarItem;
