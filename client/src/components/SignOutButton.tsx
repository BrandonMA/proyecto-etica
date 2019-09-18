import * as React from 'react';
import signOut from '../redux/thunkActionCreators/SignOut';
import {connect} from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import Button from 'react-bootstrap/Button';

interface Props {
    className?: string,
    title: string,
    signOut: () => void
}

const SignOutButton: React.FunctionComponent<Props> = (props) => {
    return (
        <Button
            className = { props.className }
            variant = 'danger'
            type = 'submit'
            onClick= { props.signOut }>
            { props.title }
        </Button>
    );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        signOut: () => {
            dispatch(signOut());
        }
    };
};

export default connect(null, mapDispatchToProps)(SignOutButton);
