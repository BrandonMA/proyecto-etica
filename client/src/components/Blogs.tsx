import React from 'react';
import DocumentCard from './DocumentCard';
import Row from 'react-bootstrap/Row';
import DocumentCreator from './DocumentCreator';
import { connect } from 'react-redux';
import getDocuments from '../redux/thunkActionCreators/GetDocuments';
import createDocument from '../redux/thunkActionCreators/CreateDocument';
import { AppState } from '../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import Container from 'react-bootstrap/Container';
import NewDocument from './NewDocument';
import Button from 'react-bootstrap/Button';

class Blogs extends DocumentCreator {

    submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isLoading: true
        });
        const data = new FormData(event.target as HTMLFormElement);
        this.props.createDocument(data.get('name').toString(), data.get('content').toString(), 'blog').then(() => {
            this.setState({
                isLoading: false,
                showModal: false
            });
        });
    }

    renderContainer(children: JSX.Element = null, modalTitle: string = "Añadir Documento") {
        return(
            <Container>
                <Row>
                    <NewDocument title={modalTitle} onSubmit={this.submit} show={this.state.showModal} onHide={this.hideModal} loading={this.state.isLoading}/>
                    <Button variant='light' className='mx-auto my-2' onClick={this.toggleModal}>{modalTitle}</Button>
                </Row>
                {children}
            </Container>
        );
    }

    render() {
        return this.renderContainer((
            <Row>
                {this.props.documents.map(document => {
                    return <DocumentCard key={document.id} type='blog' title={document.name} id={document.id} />
                })}
            </Row>
        ), "Añadir Post");
    }
}

const mapStateToProps = (state: AppState) => ({
    documents: state.documents.filter((document) => {
        return document.type === 'blog';
    }).toList()
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        getDocuments: async () => {
            await dispatch(getDocuments('blog'));
        },
        createDocument: async (name: string, content: string, type: string) => {
            await dispatch(createDocument(name, content, type))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
