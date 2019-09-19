import React from 'react';
import Container from 'react-bootstrap/Container';
import Auth from './Auth';
import NewDocument from './NewDocument';
import Button from 'react-bootstrap/Button';
import { List } from 'immutable';
import Document from '../types/Document';

interface State {
    showModal: boolean,
    isLoading: boolean
}

interface Props {
    documents: List<Document>,
    getDocuments: () => Promise<void>,
    createDocument: (name: string, content: string, type: string) => Promise<void>
}

export default class Home extends React.Component<Props, State> {

    state: Readonly<State> = {
        showModal: false,
        isLoading: false
    };

    constructor(props: Props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.getDocuments();
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isLoading: !this.state.isLoading
        });
    }

    renderContainer(children: JSX.Element = null, modalTitle: string = "Añadir Documento") {
        return(
            <Container>
                <Auth>
                    <NewDocument title={modalTitle} onSubmit={this.submit} show={this.state.showModal} onHide={this.hideModal} loading={this.state.isLoading}/>
                    <Button variant='light' className='mx-auto my-2' onClick={this.toggleModal}>{modalTitle}</Button>
                </Auth>
                {children}
            </Container>
        );
    }

    render() {
        return this.renderContainer();
    }
}
