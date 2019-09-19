import { getAuthHeaders } from './sharedHeaders';
import { SERVER } from './constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';
import { LoadDocument, LoadDocumentAction } from '../actionCreators/documents';
import Axios from 'axios';

const CreateDocument: (name: string, content: string) => ThunkAction<Promise<void>, AppState, null, LoadDocumentAction> = (name, content) => async (dispatch) => {
    const body = {
        name: name,
        content: content,
        type: 'blog'
    }
    return Axios.post('http://' + SERVER + '/api/documents/blog', body, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(LoadDocument(response.data));
    });
}

export default CreateDocument;
