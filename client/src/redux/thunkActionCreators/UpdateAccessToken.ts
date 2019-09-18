import { UpdateAccessToken, UpdateAccessTokenAction } from '../actionCreators/authentication';
import { getRefreshAuthHeaders } from './sharedHeaders';
import { SERVER } from './constants';
import { AppState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import Axios from 'axios';

const updateAccessToken: () => ThunkAction<Promise<void>, AppState, null, UpdateAccessTokenAction> = () => async (dispatch) => {
    Axios.get('http://' + SERVER + '/api/auth/token', {
        headers: getRefreshAuthHeaders()
    }).then(response => {
        const date = new Date();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenDate', date.toString());
        dispatch(UpdateAccessToken(response.data.token));
    });
}

export default updateAccessToken;
