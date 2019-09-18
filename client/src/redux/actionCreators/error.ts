import { ActionCreator } from 'redux';
import { CREATE_AUTH_ERROR, CLEAN_AUTH_ERROR } from '../actions';

export interface CreateAuthErrorAction {
    type: typeof CREATE_AUTH_ERROR,
    payload: {
        error: Error
    }
}

export const CreateAuthError: ActionCreator<CreateAuthErrorAction> = (error: Error) => {
    return {
        type: CREATE_AUTH_ERROR,
        payload: {
            error: error
        }
    }
}

export interface CleanAuthErrorAction {
    type: typeof CLEAN_AUTH_ERROR,
    payload: {
        error: Error
    }
}

export const CleanAuthError: ActionCreator<CleanAuthErrorAction> = () => {
    return {
        type: CLEAN_AUTH_ERROR,
        payload: {
            error: null
        }
    }
}
