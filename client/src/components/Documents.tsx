import React from 'react';
import DocumentCard from './DocumentCard';
import Row from 'react-bootstrap/Row';
import DocumentCreator from './DocumentCreator';
import { connect } from 'react-redux';
import getDocuments from '../redux/thunkActionCreators/GetDocuments';
import createDocument from '../redux/thunkActionCreators/CreateDocument';
import { AppState } from '../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';

class Home extends DocumentCreator {

    submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isLoading: true
        });
        const data = new FormData(event.target as HTMLFormElement);
        this.props.createDocument(data.get('name').toString(), data.get('content').toString(), 'document').then(() => {
            this.setState({
                isLoading: false,
                showModal: false
            });
        });
    }

    render() {
        return this.renderContainer((
            <Row>
                {this.props.documents.map(document => {
                    return <DocumentCard key={document.id} type='document' title={document.name} id={document.id} />
                })}
            </Row>
        ));
    }
}

const mapStateToProps = (state: AppState) => ({
    documents: state.documents.filter((document) => {
        return document.type === 'document';
    }).toList()
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        getDocuments: async () => {
            await dispatch(getDocuments('document'));
        },
        createDocument: async (name: string, content: string, type: string) => {
            await dispatch(createDocument(name, content, type))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

