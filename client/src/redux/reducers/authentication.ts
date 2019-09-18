import User from '../../types/User';
import { Record } from 'immutable';
import { LoadUserAction, UpdateAccessTokenAction, UpdateRefreshTokenAction, SignOutAction } from '../actionCreators/authentication';
import { SIGN_OUT, LOAD_USER, UPDATE_ACCESS_TOKEN, UPDATE_REFRESH_TOKEN } from '../actions';

interface AuthenticationState {
    user: User,
    token: String,
    refreshToken: String
}

const AuthenticationRecord = Record<AuthenticationState>({
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken')
});

const initialState = new AuthenticationRecord();

export default (state = initialState, action: LoadUserAction | UpdateAccessTokenAction | UpdateRefreshTokenAction | SignOutAction) => {
    switch (action.type) {
        case SIGN_OUT:
        case LOAD_USER:
            return state.withMutations((oldState) => {
                oldState.set('token', action.payload.token);
                oldState.set('refreshToken', action.payload.refreshToken);
                oldState.set('user', action.payload.user);
            });
        case UPDATE_ACCESS_TOKEN:
            return state.set('token', action.payload.token);
        case UPDATE_REFRESH_TOKEN:
            return state.set('refreshToken', action.payload.refreshToken);
    }
    return state;
}