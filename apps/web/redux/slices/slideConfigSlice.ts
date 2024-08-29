import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
    SlideTheme,
    SlideClass,
    SlideSize,
    SlideConfigState,
} from '@markslides/renderer';

const initialState: SlideConfigState = {
    header: '',
    footer: '![height:40px](/image/credit.png)',
    paginate: false,
    theme: 'default',
    class: 'normal',
    size: '16:9',
};

export const slideConfigSlice = createSlice({
    name: 'slideConfig',
    initialState,
    reducers: {
        setSlideConfig: (
            state: SlideConfigState,
            action: PayloadAction<SlideConfigState>
        ) => {
            return action.payload;
        },
        resetSlideConfig: () => {
            return initialState;
        },
        setHeader: (state: SlideConfigState, action: PayloadAction<string>) => {
            state.header = action.payload;
        },
        setFooter: (state: SlideConfigState, action: PayloadAction<string>) => {
            state.footer = action.payload;
        },
        setPaginate: (
            state: SlideConfigState,
            action: PayloadAction<boolean>
        ) => {
            state.paginate = action.payload;
        },
        setTheme: (
            state: SlideConfigState,
            action: PayloadAction<SlideTheme>
        ) => {
            state.theme = action.payload;
        },
        setClass: (
            state: SlideConfigState,
            action: PayloadAction<SlideClass>
        ) => {
            state.class = action.payload;
        },
        setSize: (
            state: SlideConfigState,
            action: PayloadAction<SlideSize>
        ) => {
            state.size = action.payload;
        },
    },
});

export const {
    setSlideConfig,
    resetSlideConfig,
    setHeader,
    setFooter,
    setPaginate,
    setTheme,
    setClass,
    setSize,
} = slideConfigSlice.actions;

export default slideConfigSlice.reducer;
