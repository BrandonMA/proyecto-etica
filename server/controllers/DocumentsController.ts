const autoBind = require('auto-bind');
import Document, { IDocument, DocumentType, JSONDocument } from '../models/Document';
import { Request } from 'express';

export default class DocumentsController {

    constructor() {
        autoBind(this);
    }

    async createDocument(data: JSONDocument) {
        const document: IDocument = await Document.create({...data});
        data.id = document._id;
        return data;
    }

    async getDocument(id: string) {
        const document: IDocument = await Document.findById(id);
        return this.createJSONDocument(document);
    }

    async getDocuments(type: DocumentType) {
        const documents = await Document.find({
            type: type
        });
        let jsonDocuments = documents.map(document => {
            return this.createJSONDocument(document);
        });
        return jsonDocuments;
    }

    createJSONDocumentFromRequest(req: Request) {
        const jsonDocument: JSONDocument = {
            name: req.body.name,
            content: req.body.content,
            id: null,
            type: req.body.type
        }
        return jsonDocument
    }

    createJSONDocument(document: IDocument) {
        const jsonDocument: JSONDocument = {
            name: document.name,
            content: document.content,
            id: document._id,
            type: document.type
        }
        return jsonDocument
    }

}
