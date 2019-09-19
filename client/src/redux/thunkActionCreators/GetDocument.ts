import { getJSONHeaders } from './sharedHeaders';
import { SERVER } from './constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';
import { LoadDocument, LoadDocumentAction } from '../actionCreators/documents';
import Axios from 'axios';

const GetDocument: (id: string) => ThunkAction<Promise<void>, AppState, null, LoadDocumentAction> = (id) => async (dispatch) => {
    return Axios.get('http://' + SERVER + '/api/documents/' + id, {
        headers: getJSONHeaders()
    })
    .then(response => {
        dispatch(LoadDocument(response.data));
    });
}

export default GetDocument;
