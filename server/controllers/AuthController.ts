import * as jwt from 'jsonwebtoken';
import * as argon2 from "argon2";
import User, { IUser, UserType, JSONUser } from '../models/User';
import { NextFunction, Response, Request } from 'express';
const autoBind = require('auto-bind');

const API_SECRET = 'CpVatkEtcJASKtbGBAS8jF4HHccrfJHC';
const API_SECRET_REFRESH = 'jTs0L1tVNMFmFl6LL4yr3J11Y7ghQask';
const ADMIN_KEY = 'EqLQbgygHAT83iyoZ9jfgd1eAOiLaBuG';

export interface TokenPayload {
    email: string,
    type: UserType
}

export const handleError: (error: Error, response: Response) => void = (error, response) => {
    response.status(403);
    response.json({
        error: error.message
    });
};

export default class AuthController {

    constructor() {
        autoBind(this);
    }

    // MARK: - Creators

    async signUp(information: Object, password: string, key: string) {
        const hashedPassword = await argon2.hash(password);
        const user: IUser = await User.create({
            ...information,
            password: hashedPassword,
            type: key === ADMIN_KEY ? 'admin' : 'normal'
        });
        const tokens = await this.generateTokens(user.email, user.type);
        return this.generateDataResponse(tokens, user);
    }

    async signIn(email: string, password: string) {
        const user = await this.getUser(email, true);
        const correct = await this.checkPassword(user, password);
        if (correct) {
            const tokens = await this.generateTokens(user.email, user.type);
            return this.generateDataResponse(tokens, user);
        } else {
            throw Error('Wrong credentials');
        }
    }

    // MARK: - Queries

    async getUser(email: string, includePassword = false) {
        let query = User.findOne({
            email: email
        });
        if (!includePassword) query.select('-password');
        return query.exec();
    }

    // MARK: - Helpers

    generateUserResponse(user: IUser) {
        const jsonUser: JSONUser = {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            type: user.type
        }
        return jsonUser
    }

    generateDataResponse(tokens: Object, user: IUser) {
        return {
            ...tokens,
            user: this.generateUserResponse(user)
        };
    }

    // MARK: - Credentials Verification

    async checkToken(req: Request, res: Response, next: NextFunction) {
        return this.getTokenFromRequest(req)
        .then((token) => {
            return this.verifyToken(token);
        })
        .then(() => {
            next();
        }).catch((error) => {
            handleError(error, res);
        });
    }

    async checkAdminToken(req: Request, res: Response, next: NextFunction) {
        return this.getTokenFromRequest(req)
        .then((token) => {
            return this.verifyToken(token)
        })
        .then((token) => {
            const decoded: any = jwt.decode(token);
            if (decoded.type === 'admin') {
                next();
            } else {
                throw Error('The user does not have enough permissions to perform this action.');
            }
        });
    }

    async checkPassword(user: IUser, password: string) {
        return argon2.verify(user.password, password)
    }

    async getNormalizedToken(token: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (token === null || token === undefined) {
                reject(Error('Auth token is not supplied'));
            } else if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length); // Remove Bearer from string
            }

            if (token.length > 7) {
                resolve(token);
            } else {
                reject(Error('Auth token is not complete'));
            }
        });
    }

    async getTokenFromRequest(req: Request): Promise<string> {
        let token = req.body.token || req.headers['x-access-token'] || req.headers['authorization'] || req.params.token;
        return this.getNormalizedToken(token);
    }

    getRefreshTokenFromRequest(req: Request): Promise<string> {
        let refreshToken = req.body.refreshToken || req.headers['x-refresh-token'] || req.headers['authorization-refresh'] || req.params.refreshToken;
        return this.getNormalizedToken(refreshToken);
    }

    async verifyToken(token: string): Promise<string> {
        return this.verifyAnyToken(token, API_SECRET);
    }

    async verifyRefreshToken(token: string): Promise<string> {
        return this.verifyAnyToken(token, API_SECRET_REFRESH);
    } 

    async verifyAnyToken(token: string, secret: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            });
        });
    };

    // MARK: - Token Generation

    generateToken(email: string, type: UserType) {
        const payload: TokenPayload = {
            email: email,
            type: type
        };
        const tokenDuration = '7d';
        return jwt.sign(payload, API_SECRET,
        {
            expiresIn: tokenDuration
        });
    }

    generateRefreshToken(email: string, type: UserType) {
        const payload: TokenPayload = {
            email: email,
            type: type
        };
        const tokenDuration = '30d';
        const token = jwt.sign(payload, API_SECRET_REFRESH,
        {
            expiresIn: tokenDuration
        });
        return token
    }

    async generateTokens(email: string, type: UserType) {
        return {
            token: this.generateToken(email, type),
            refreshToken: this.generateRefreshToken(email, type)
        };
    }
}
