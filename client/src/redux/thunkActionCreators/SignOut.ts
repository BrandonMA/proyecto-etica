import { AppState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import { SignOut, SignOutAction } from '../actionCreators/authentication';

const signOut: () => ThunkAction<void, AppState, null, SignOutAction> = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch(SignOut());
}

export default signOut;
