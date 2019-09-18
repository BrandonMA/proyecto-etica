import * as React from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import User from '../types/User';
import loadUser from '../redux/thunkActionCreators/LoadUser';
import updateAccessToken from '../redux/thunkActionCreators/UpdateAccessToken';
import updateRefreshToken from '../redux/thunkActionCreators/UpdateRefreshToken';
import signOut from '../redux/thunkActionCreators/SignOut';
import { AppState } from '../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { Redirect } from 'react-router-dom';

interface Props {
    user: User,
    token: string,
    refreshToken: string,
    loadUser: (token: string, refreshToken: string) => Promise<void>,
    updateAccessToken: () => Promise<void>,
    updateRefreshToken: () => Promise<void>,
    signOut: () => void
}

const Auth: React.FunctionComponent<Props> = (props) => {

    const checkTokenForUpdate = async () => {
        const {token} = props;
        if (token !== null) {
            let date = localStorage.getItem("tokenDate");
            if (date !== null) {
                const dayDifference = getDaysDifferenceForToken(date);
                if (dayDifference > 6) {
                    await props.updateAccessToken();
                }
            }
        } else {
            // throw(Error('No token available'));
        }
    }

    const checkRefreshTokenForUpdate = async () => {
        const {refreshToken} = props;
        if (refreshToken !== null) {
            let date = localStorage.getItem("refreshTokenDate");
            if (date !== null) {
                const dayDifference = getDaysDifferenceForToken(date);
                if (dayDifference > 28 && dayDifference < 31) {
                    await props.updateRefreshToken();
                } else if (dayDifference > 31) {
                    props.signOut();
                }
            }
        } else {
            // throw(Error('No refresh token available'));
        }
    }

    const loadUserIfNeeded = async () => {
        const { user, token, refreshToken } = props;
        if (user === null) {
            await props.loadUser(token, refreshToken);
        }
    }

    const getDaysDifferenceForToken = (date: string): number => {
        const dateObject = Date.parse(date);
        const now = moment();
        const momentDate = moment(dateObject);
        return now.diff(momentDate, 'days');
    }

    checkRefreshTokenForUpdate()
    .then(() => {
        return checkTokenForUpdate();
    }).then(() => {
        return loadUserIfNeeded();
    });

    if (props.token === null || props.refreshToken === null) {
        return <Redirect to='/signin'/>
    } else {
        if (props.user === null) {
            return <div/> // Return loading
        } else {
            return (
                <div>
                    {props.children}
                </div>
            );
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.authentication.user,
    token: state.authentication.token,
    refreshToken: state.authentication.refreshToken
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        loadUser: async (token: string, refreshToken: string) => {
            await dispatch(loadUser(token, refreshToken));
        },
        updateAccessToken: async () => {
            await dispatch(updateAccessToken());
        },
        updateRefreshToken: async () => {
            await dispatch(updateRefreshToken());
        },
        signOut: () => {
            dispatch(signOut());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
