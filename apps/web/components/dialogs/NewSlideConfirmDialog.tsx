import { useCallback } from 'react';
import { Flex } from '@markslides/ui/flex';
import { Button } from '@markslides/ui/button';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import { resetLocalSlice } from '@/redux/slices/localSlice';
import DialogBase, {
    type DialogPropsWithPayload,
} from '@/components/dialogs/DialogBase';

function NewSlideConfirmDialog(props: DialogPropsWithPayload) {
    const { payload, onOpenChange, ...others } = props;

    const dispatch = useAppDispatch();

    const setNewSlideForLocalMode = useCallback(() => {
        dispatch(resetLocalSlice());
        onOpenChange(false);
    }, [dispatch]);

    return (
        <DialogBase
            onOpenChange={onOpenChange}
            {...others}>
            <Flex
                justifyContent='flex-end'
                gap='8px'>
                <Button onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={setNewSlideForLocalMode}>Okay</Button>
            </Flex>
        </DialogBase>
    );
}

export default NewSlideConfirmDialog;
