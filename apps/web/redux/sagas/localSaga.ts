import type { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, delay } from 'redux-saga/effects';
import {
    setContentRequested,
    setContentSucceeded,
} from '@/redux/slices/localSlice';

function* setContent(action: PayloadAction<string>) {
    // Debouncing delay
    yield delay(300);

    const newContent = action.payload;
    yield put(setContentSucceeded(newContent));
}

export function* saga() {
    yield takeLatest(setContentRequested, setContent);
}
