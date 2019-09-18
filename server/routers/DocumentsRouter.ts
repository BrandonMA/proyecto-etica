import express from 'express';
const router = express.Router();
import DocumentsController from '../controllers/DocumentsController';
import AuthController, { handleError } from '../controllers/AuthController';
import { DocumentType } from '../models/Document';

const documentController = new DocumentsController();
const authController = new AuthController();

router.get('/:id', (req, res) => {
    documentController.getDocument(req.params.id).then((document) => {
        res.json(document);
    }).catch(error => {
        handleError(error, res);
    });
});

router.get('', (req, res) => {
    let type = req.query.type;
    if (type !== undefined && type !== null) {
        documentController.getDocuments(type).then((documents) => {
            res.json(documents);
        })
    } else {
        handleError(new Error('Incorrect type'), res);
    }
});

router.post('', authController.checkToken, (req, res) => {
    documentController.createDocument(documentController.createJSONDocumentFromRequest(req)).then((document) => {
        res.json(document);
    }).catch(error => {
        handleError(error, res);
    });
});

router.post('/blog', (req, res) => {
    const blog = documentController.createJSONDocumentFromRequest(req);
    if (blog.type !== DocumentType.blog) {
        handleError(new Error('Incorrect type'), res);
    } else {
        documentController.createDocument(blog).then((document) => {
            res.json(document);
        }).catch(error => {
            handleError(error, res);
        });
    }
});

export default router;
