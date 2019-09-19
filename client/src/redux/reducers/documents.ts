import Document from '../../types/Document';
import { Record, Set, Map } from 'immutable';
import { LoadDocumentAction, LoadDocumentsAction } from '../actionCreators/documents';
import { LOAD_DOCUMENT, LOAD_DOCUMENTS } from '../actions';

const initialState = Map<String, Document>();

export default (state = initialState, action: LoadDocumentAction | LoadDocumentsAction) => {
    switch (action.type) {
        case LOAD_DOCUMENT:
            return state.set(action.payload.document.id, action.payload.document);
        case LOAD_DOCUMENTS:
                return state.withMutations((state) => {
                    action.payload.documents.forEach(document => {
                        state.set(document.id, document);
                    });
                    return state;
                });
    }
    return state;
}
