import { getAuthHeaders } from './sharedHeaders';
import { SERVER } from './constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';
import { LoadDocument, LoadDocumentAction } from '../actionCreators/documents';
import Axios from 'axios';

const CreateDocument: (name: string, content: string, type: string) => ThunkAction<Promise<void>, AppState, null, LoadDocumentAction> = (name, content, type) => async (dispatch) => {
    const body = {
        name: name,
        content: content,
        type: type
    }
    const url = type === 'blog' ? 'http://' + SERVER + '/api/documents/blog' : 'http://' + SERVER + '/api/documents/'
    console.log(url);
    return Axios.post(url, body, {
        headers: getAuthHeaders()
    })
    .then(response => {
        console.log(response);
        dispatch(LoadDocument(response.data));
    });
}

export default CreateDocument;
