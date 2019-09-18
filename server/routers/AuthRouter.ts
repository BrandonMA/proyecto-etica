import express from 'express';
const router = express.Router();
import AuthController, { TokenPayload, handleError } from '../controllers/AuthController';
import * as jwt from 'jsonwebtoken';

const authController = new AuthController();

// Agrega error handling

router.post('/signup', (req, res) => {
    const {password, key} = req.body;
    const user = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email
    };
    authController.signUp(user, password, key).then((data) => {
        return res.json(data);
    }).catch(error => {
        handleError(error, res);
    });
});

router.post('/signin', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    authController.signIn(email, password).then((data) => {
        return res.json(data);
    }).catch(error => {
        handleError(error, res);
    });
});

router.get('/user', authController.checkToken, (req, res) => {
    authController.getTokenFromRequest(req).then((token) => {
        const decoded = jwt.decode(token) as TokenPayload;
        return authController.getUser(decoded.email);
    }).then((user) => {
        res.json(user);
    }).catch(error => {
        handleError(error, res);
    });
});

router.get('/token', authController.checkToken, (req, res) => {
    authController.getTokenFromRequest(req).then((token) => {
        return authController.verifyRefreshToken(token);
    }).then((token) => {
        const decoded = jwt.decode(token) as TokenPayload;
        res.json({
            token: authController.generateToken(decoded.email, decoded.type)
        });
    }).catch(error => {
        handleError(error, res);
    });
});

router.get('/refreshtoken', authController.checkToken, (req, res) => {
    authController.getRefreshTokenFromRequest(req).then((token) => {
        return authController.verifyRefreshToken(token);
    }).then((token) => {
        const decoded = jwt.decode(token) as TokenPayload;
        res.json({
            token: authController.generateTokens(decoded.email, decoded.type)
        });
    }).catch(error => {
        handleError(error, res);
    });
});

export default router;
