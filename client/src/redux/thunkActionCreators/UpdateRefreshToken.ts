import { UpdateRefreshToken, UpdateRefreshTokenAction } from '../actionCreators/authentication';
import { getRefreshAuthHeaders } from './sharedHeaders';
import { SERVER } from './constants';
import { AppState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import Axios from 'axios';

const updateRefreshToken: () => ThunkAction<Promise<void>, AppState, null, UpdateRefreshTokenAction> = () => async (dispatch) => {
    Axios.get('http://' + SERVER + '/api/auth/refreshtoken', {
        headers: getRefreshAuthHeaders()
    }).then(response => {
        const date = new Date();
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('refreshTokenDate', date.toString());
        dispatch(UpdateRefreshToken(response.data.token));
    });
}

export default updateRefreshToken;
