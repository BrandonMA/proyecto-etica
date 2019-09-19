import React from 'react';
import Container from 'react-bootstrap/Container';
import ReactMarkdown from 'react-markdown';
import getDocument from '../redux/thunkActionCreators/GetDocument';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router-dom';
import Document from '../types/Document';

// https://word2md.com

interface Params {
    id: string
}

interface Props extends RouteComponentProps<Params> {
    document: Document,
    getDocument: (id: string) => Promise<void>
}

const Document: React.FunctionComponent<Props> = (props) => {
    if (props.document === undefined) {
        props.getDocument(props.match.params.id);
    }
    return(
        <Container>
            { props.document !== undefined ? <ReactMarkdown source={props.document.content.split('\n').join('  \n')}/> : null }
        </Container>
    );
}

const mapStateToProps = (state: AppState, ownProps: Props) => ({
    document: state.documents.get(ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        getDocument: async (id: string) => {
            await dispatch(getDocument(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Document);
