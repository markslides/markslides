import { all } from 'redux-saga/effects';
// Sagas
import { saga as localSaga } from '@/redux/sagas/localSaga';

export default function* rootSaga() {
    yield all([localSaga()]);
}
