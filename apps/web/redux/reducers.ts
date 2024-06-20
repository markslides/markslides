import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import sessionStorage from 'redux-persist/lib/storage/session';
import appReducer from '@/redux/slices/appSlice';
import modalReducer from '@/redux/slices/modalSlice';
import tutorialReducer from '@/redux/slices/tutorialSlice';
import folderReducer from '@/redux/slices/folderSlice';
import slideReducer from '@/redux/slices/slideSlice';
import imageReducer from '@/redux/slices/imageSlice';
import publicationReducer from '@/redux/slices/publicationSlice';
import slideConfigReducer from '@/redux/slices/slideConfigSlice';
import aiReducer from '@/redux/slices/aiSlice';
import localReducer from '@/redux/slices/localSlice';
import editorReducer from '@/redux/slices/editorSlice';
import imageBulkInsertReducer from '@/redux/slices/imageBulkInsertSlice';

const appReducerConfig = {
    key: 'app',
    storage: storage,
    blacklist: ['isSlideShowMode', 'currentFileHandle'],
};

// const markdownPersistConfig = {
//     key: 'markdown',
//     storage: storage,
//     blacklist: ['generateContent', 'makeAssist', 'generateImage'],
// };

const rootReducer = combineReducers({
    app: persistReducer(appReducerConfig, appReducer),
    modal: modalReducer,
    tutorial: tutorialReducer,
    folder: folderReducer,
    slide: slideReducer,
    image: imageReducer,
    publication: publicationReducer,
    slideConfig: slideConfigReducer,
    // markdown: persistReducer(markdownPersistConfig, markdownReducer),
    ai: aiReducer,
    local: localReducer,
    editor: editorReducer,
    imageBulkInsert: imageBulkInsertReducer,
});

export default rootReducer;
