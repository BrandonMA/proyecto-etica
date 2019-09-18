import User from "../../types/User";
import { ActionCreator } from "redux";
import { LOAD_USER, UPDATE_ACCESS_TOKEN, UPDATE_REFRESH_TOKEN, SIGN_OUT } from "../actions";

export interface LoadUserAction {
    type: typeof LOAD_USER,
    payload: {
        user: User,
        token: String,
        refreshToken: String
    }
}

export const LoadUser: ActionCreator<LoadUserAction> = (user: User, token: String, refreshToken: String) => {
    return {
        type: LOAD_USER,
        payload: {
            user: user,
            token: token,
            refreshToken: refreshToken
        }
    }
}

export interface UpdateAccessTokenAction {
    type: typeof UPDATE_ACCESS_TOKEN,
    payload: {
        token: String
    }
}

export const UpdateAccessToken: ActionCreator<UpdateAccessTokenAction> = (token: String) => {
    return {
        type: UPDATE_ACCESS_TOKEN,
        payload: {
            token: token
        }
    }
}

export interface UpdateRefreshTokenAction {
    type: typeof UPDATE_REFRESH_TOKEN,
    payload: {
        refreshToken: String
    }
}

export const UpdateRefreshToken: ActionCreator<UpdateRefreshTokenAction> = (refreshToken: String) => {
    return {
        type: UPDATE_REFRESH_TOKEN,
        payload: {
            refreshToken: refreshToken
        }
    }
}

export interface SignOutAction {
    type: typeof SIGN_OUT,
    payload: {
        user: null,
        token: null,
        refreshToken: null
    }
}

export const SignOut: ActionCreator<SignOutAction> = () => {
    return {
        type: SIGN_OUT,
        payload: {
            user: null,
            token: null,
            refreshToken: null
        }
    }
}
