import DialogBase, {
    type DialogPropsWithPayload,
} from '@/components/dialogs/DialogBase';

function SlideSettingDialog(props: DialogPropsWithPayload) {
    const { payload, onOpenChange, ...others } = props;

    return (
        <DialogBase
            onOpenChange={onOpenChange}
            {...others}>
            SlideSettingDialog
        </DialogBase>
    );
}

export default SlideSettingDialog;
