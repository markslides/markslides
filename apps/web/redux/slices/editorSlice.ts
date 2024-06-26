import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SlideInfo } from '@markslides/editor';

export interface EditorState {
    slideInfo: SlideInfo;
    currentCursorPosition: number;
    currentLineNumber: number;
    currentSelectionStr: string;
}

const initialState: EditorState = {
    slideInfo: {
        title: '',
        currentSlideTitle: '',
        currentSlideNumber: 0,
        totalSlideCount: 0,
    },
    currentCursorPosition: 0,
    currentLineNumber: 0,
    currentSelectionStr: '',
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setCurrentCursorPosition: (
            state: EditorState,
            action: PayloadAction<number>
        ) => {
            state.currentCursorPosition = action.payload;
        },
        setCurrentLineNumber: (
            state: EditorState,
            action: PayloadAction<number>
        ) => {
            state.currentLineNumber = action.payload;
        },
        setCurrentSelectionStr: (
            state: EditorState,
            action: PayloadAction<string>
        ) => {
            state.currentSelectionStr = action.payload;
        },
        setSlideInfo: (
            state: EditorState,
            action: PayloadAction<SlideInfo>
        ) => {
            state.slideInfo = action.payload;
        },
        // Etc
        resetEditorSlice: () => initialState,
    },
});

export const {
    setCurrentCursorPosition,
    setCurrentLineNumber,
    setCurrentSelectionStr,
    setSlideInfo,
    // Etc
    resetEditorSlice,
} = editorSlice.actions;

export default editorSlice.reducer;
