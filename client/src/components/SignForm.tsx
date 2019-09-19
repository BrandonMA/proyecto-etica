import * as React from 'react';
import LoadingButton from './LoadingButton';
import { Redirect } from 'react-router';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Form from 'react-bootstrap/Form';

interface Props {
    loadingButtonTitle: string,
    alternativeButtonTitle: string,
    showSpinner: boolean,
    redirectURL: string,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

interface State {
    redirect: boolean
}

export default class SignForm extends React.Component<Props, State> {

    state: Readonly<State> = {
        redirect: false
    };

    render() {
        const buttonsClassName = 'w-50 mb-3 align-self-center';
        return this.state.redirect ? <Redirect to='/'/> : (
            <Form
                onSubmit={this.props.onSubmit}
                className='py-3 d-flex flex-column'>
                {this.props.children}
                <LoadingButton
                    className={buttonsClassName}
                    variant='light'
                    spinnerVariant='dark'
                    disabled={this.props.showSpinner}
                    loading={this.props.showSpinner}
                    title={this.props.loadingButtonTitle}/>
                <LinkContainer to={this.props.redirectURL}>
                    <Button className={buttonsClassName}>{this.props.alternativeButtonTitle}</Button>
                </LinkContainer>
            </Form>
        );
    }
}
