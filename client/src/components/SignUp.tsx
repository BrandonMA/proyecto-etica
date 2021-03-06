import * as React from 'react';
import { connect } from 'react-redux';
import signUp from '../redux/thunkActionCreators/SignUp';
import { ThunkDispatch } from 'redux-thunk';
import { Redirect } from 'react-router-dom';
import SignForm from './SignForm';
import Form from 'react-bootstrap/Form';
import { CreateAuthError } from '../redux/actionCreators/error';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

interface Props {
    signUp: (email: string, password: string, name: string, lastname: string, key: string) => Promise<void>,
    createAuthError: (error: Error) => Promise<void>
}

interface State {
    showSpinner: boolean,
    redirect: boolean
}

class SignUp extends React.Component<Props, State> {

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
        this.props.signUp(
            data.get('email').toString(),
            data.get('password').toString(),
            data.get('name').toString(),
            data.get('lastname').toString(),
            data.get('key').toString()
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
                            loadingButtonTitle='Crear Cuenta'
                            alternativeButtonTitle='Iniciar Sesión'
                            redirectURL='/signin'
                            onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' name='email' required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type='text' name='name' required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type='text' name='lastname' required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' name='password' required></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Admin Key</Form.Label>
                                <Form.Control type='text' name='key' required></Form.Control>
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
        signUp: async (email: string, password: string, name: string, lastname: string, key: string) => {
            await dispatch(signUp(email, password, name, lastname, key));
        }, createAuthError: (error: Error) => {
            dispatch(CreateAuthError(error));
        }
    };
};

export default connect(null, mapDispatchToProps)(SignUp);
