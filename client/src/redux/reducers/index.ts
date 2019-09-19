import { combineReducers } from 'redux';
import authentication from './authentication';
import documents from './documents';
import error from './error';

const rootReducer = combineReducers({
    authentication: authentication,
    error: error,
    documents: documents
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
