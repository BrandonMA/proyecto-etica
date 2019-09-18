import { combineReducers } from 'redux';
import authentication from './authentication';
import error from './error';

const rootReducer = combineReducers({
    authentication: authentication,
    error: error
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
