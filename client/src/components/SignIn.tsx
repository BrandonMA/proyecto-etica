import * as React from 'react';
import { connect } from 'react-redux';
import signIn from '../redux/thunkActionCreators/SignIn';
import { ThunkDispatch } from 'redux-thunk';
import { Redirect } from 'react-router-dom';
import SignForm from './SignForm';
import { CreateAuthError } from '../redux/actionCreators/error';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

interface Props {
    signIn: (email: string, password: string) => Promise<void>,
    createAuthError: (error: Error) => Promise<void>
}

interface State {
    showSpinner: boolean,
    redirect: boolean
}

class SignIn extends React.Component<Props, State> {

    state: Readonly<State> = {
        showSpinner: false,
        redirect: false
    };

    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            showSpinner: true
        });
        const data = new FormData(event.target as HTMLFormElement);
        this.props.signIn(
            data.get('email').toString(),
            data.get('password').toString()
        ).then(() => {
            this.setState({
                redirect: true
            })
        }).catch(error => {
            this.setState({
                showSpinner: false
            });
            this.props.createAuthError(error);
        });
    }

    render() {
        return this.state.redirect ? <Redirect to='/'/> : (
            <Container>
                <Row>
                    <Col xs='1' sm='2' md='4'/>
                    <Col xs='10' sm='8' md='4'>
                        <SignForm
                            showSpinner={this.state.showSpinner}
                            loadingButtonTitle='Iniciar Sesión'
                            alternativeButtonTitle='Crear Cuenta'
                            redirectURL='/signup'
                            onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' name='email' required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' name='password' required></Form.Control>
                            </Form.Group>
                        </SignForm>
                    </Col>
                    <Col xs='1' sm='2' md='4'/>
                </Row>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        signIn: async (email: string, password: string) => {
            await dispatch(signIn(email, password));
        }, createAuthError: (error: Error) => {
            dispatch(CreateAuthError(error));
        }
    };
};

export default connect(null, mapDispatchToProps)(SignIn);
