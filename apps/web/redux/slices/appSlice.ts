import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    isSlideShowMode: boolean;
    currentFileHandle: FileSystemFileHandle | null;
}

const initialState: AppState = {
    isSlideShowMode: false,
    currentFileHandle: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsSlideShowMode: (
            state: AppState,
            action: PayloadAction<boolean>
        ) => {
            state.isSlideShowMode = action.payload;
        },
        setCurrentFileHandle: (
            state: AppState,
            action: PayloadAction<FileSystemFileHandle | null>
        ) => {
            state.currentFileHandle = action.payload;
        },
    },
});

export const { setIsSlideShowMode, setCurrentFileHandle } = appSlice.actions;

export default appSlice.reducer;
