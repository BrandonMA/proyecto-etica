import { ActionCreator } from "redux";
import { LOAD_DOCUMENT, LOAD_DOCUMENTS } from "../actions";
import Document from '../../types/Document';

export interface LoadDocumentAction {
    type: typeof LOAD_DOCUMENT,
    payload: {
        document: Document
    }
}

export const LoadDocument: ActionCreator<LoadDocumentAction> = (document: Document) => {
    return {
        type: LOAD_DOCUMENT,
        payload: {
            document: document
        }
    }
}

export interface LoadDocumentsAction {
    type: typeof LOAD_DOCUMENTS,
    payload: {
        documents: Array<Document>
    }
}

export const LoadDocuments: ActionCreator<LoadDocumentsAction> = (documents: Array<Document>) => {
    return {
        type: LOAD_DOCUMENTS,
        payload: {
            documents: documents
        }
    }
}
