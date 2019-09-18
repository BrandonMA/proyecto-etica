import { CreateAuthErrorAction, CleanAuthErrorAction } from "../actionCreators/error";
import { CREATE_AUTH_ERROR, CLEAN_AUTH_ERROR } from "../actions";
import { Record } from "immutable";

interface ErrorState {
    message: string
}

const ErrorRecord = Record<ErrorState>({
    message: null
});

const initialState = new ErrorRecord();

export default (state = initialState, action: CreateAuthErrorAction | CleanAuthErrorAction) => {
    switch (action.type) {
        case CREATE_AUTH_ERROR:
            return state.set('message', action.payload.error.message);
        case CLEAN_AUTH_ERROR:
            return state.set('message', null);
    }
    return state;
}