import DialogBase, {
    type DialogPropsWithPayload,
} from '@/components/dialogs/DialogBase';

function OpenSlideDialog(props: DialogPropsWithPayload) {
    const { payload, ...others } = props;

    return (
        <DialogBase {...others}>
            <fieldset>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    defaultValue='Pedro Duarte'
                />
            </fieldset>
            <fieldset>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    defaultValue='@peduarte'
                />
            </fieldset>
            <div
                style={{
                    display: 'flex',
                    marginTop: 25,
                    justifyContent: 'flex-end',
                }}>
                <button>Save changes</button>
            </div>
        </DialogBase>
    );
}

export default OpenSlideDialog;
