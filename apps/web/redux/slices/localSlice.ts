import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LocalState {
    title: string;
    outline: string;
    content: string;
}

const initialState: LocalState = {
    title: '',
    outline: '',
    content: '',
};

export const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        setTitle: (state: LocalState, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setOutline: (state: LocalState, action: PayloadAction<string>) => {
            state.outline = action.payload;
        },
        setOutlineStreamed: (
            state: LocalState,
            action: PayloadAction<string>
        ) => {
            const chunk = action.payload;
            state.outline = state.outline + chunk;
            // Remove start divider if it exists
            if (state.outline.startsWith('---')) {
                state.outline = state.outline
                    .substring(4, state.outline.length)
                    .trim();
            }
        },
        setContentRequested: (
            state: LocalState,
            action: PayloadAction<string>
        ) => {},
        setContentSucceeded: (
            state: LocalState,
            action: PayloadAction<string>
        ) => {
            state.content = action.payload;
        },
        setContentStreamed: (
            state: LocalState,
            action: PayloadAction<string>
        ) => {
            const chunk = action.payload;
            state.content = state.content + chunk;
            // Remove start divider if it exists
            if (state.content.startsWith('---')) {
                state.content = state.content
                    .substring(4, state.content.length)
                    .trim();
            }
        },
        resetLocalSlice: () => initialState,
    },
});

export const {
    setTitle,
    setOutline,
    setOutlineStreamed,
    setContentRequested,
    setContentSucceeded,
    setContentStreamed,
    resetLocalSlice,
} = localSlice.actions;

export default localSlice.reducer;
