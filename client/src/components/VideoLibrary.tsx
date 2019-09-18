import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import DocumentCard from './DocumentCard';

const VideoLibrary: React.FunctionComponent<{}> = () => {
    return(
        <Container>
            <h1 className='text-center'>Videoteca</h1>
            <Row>
                <DocumentCard type='video' title='Documento 1' id='1' />
                <DocumentCard type='video' title='Documento 1' id='1' />
                <DocumentCard type='video' title='Documento 1' id='1' />
                <DocumentCard type='video' title='Documento 1' id='1' />
            </Row>
        </Container>
    );
}

export default VideoLibrary;
