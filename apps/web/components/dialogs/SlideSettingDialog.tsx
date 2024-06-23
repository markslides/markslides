import DialogBase, {
    type DialogPropsWithPayload,
} from '@/components/dialogs/DialogBase';

function SlideSettingDialog(props: DialogPropsWithPayload) {
    const { payload, ...others } = props;

    return <DialogBase {...others}>SlideSettingDialog</DialogBase>;
}

export default SlideSettingDialog;
