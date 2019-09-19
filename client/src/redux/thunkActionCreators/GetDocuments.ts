import { getJSONHeaders } from './sharedHeaders';
import { SERVER } from './constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';
import { LoadDocuments, LoadDocumentsAction } from '../actionCreators/documents';
import Axios from 'axios';

const GetDocuments: (type: string) => ThunkAction<Promise<void>, AppState, null, LoadDocumentsAction> = (type) => async (dispatch) => {
    return Axios.get('http://' + SERVER + '/api/documents/?type=' + type, {
        headers: getJSONHeaders()
    })
    .then(response => {
        dispatch(LoadDocuments(response.data));
    });
}

export default GetDocuments;
