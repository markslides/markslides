import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from '@/redux/slices/appSlice';
import slideConfigReducer from '@/redux/slices/slideConfigSlice';
import localReducer from '@/redux/slices/localSlice';
import editorReducer from '@/redux/slices/editorSlice';

const appReducerConfig = {
    key: 'app',
    storage: storage,
    blacklist: ['isSlideShowMode', 'currentFileHandle'],
};

const rootReducer = combineReducers({
    app: persistReducer(appReducerConfig, appReducer),
    slideConfig: slideConfigReducer,
    local: localReducer,
    editor: editorReducer,
});

export default rootReducer;
