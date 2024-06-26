import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dialogObjs, type DialogKey } from '@/components/dialogs';

export interface DialogState {
    dialogStateMap: Record<DialogKey, null | Object>;
}

const initialState: DialogState = {
    dialogStateMap: dialogObjs.reduce(
        (prev, current) => {
            prev[current.key] = null;
            return prev;
        },
        {} as Record<DialogKey, null | Object>
    ),
};

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (
            state: DialogState,
            action: PayloadAction<{
                key: DialogKey;
                payload?: Object;
            }>
        ) => {
            const { key: modalKey, payload } = action.payload;
            state.dialogStateMap = {
                ...state.dialogStateMap,
                [modalKey]: payload ?? {},
            };
        },
        closeDialog: (state: DialogState, action: PayloadAction<DialogKey>) => {
            const modalKey = action.payload;
            state.dialogStateMap = {
                ...state.dialogStateMap,
                [modalKey]: null,
            };
        },
        closeAllDialog: (state: DialogState) => {
            return initialState;
        },
    },
});

export const { openDialog, closeDialog, closeAllDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
