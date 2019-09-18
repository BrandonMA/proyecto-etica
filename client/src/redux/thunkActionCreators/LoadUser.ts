import { getAuthHeaders } from './sharedHeaders';
import { SERVER } from './constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';
import { LoadUserAction, LoadUser } from '../actionCreators/authentication';
import Axios from 'axios';

const loadUser: (token: string, refreshToken: string) => ThunkAction<Promise<void>, AppState, null, LoadUserAction> = (token, refreshToken) => async (dispatch) => {
    return Axios.get('http://' + SERVER + '/api/auth/user', {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            LoadUser(
                response.data,
                token,
                refreshToken
            )
        );
    });
}

export default loadUser;
