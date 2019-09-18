import React from 'react';
import Container from 'react-bootstrap/Container';
import DocumentCard from './DocumentCard';
import Row from 'react-bootstrap/Row';

const Home: React.FunctionComponent<{}> = () => {
    return(
        <Container>
            <h1 className='text-center'>Notas periodisticas</h1>
            <Row>
                <DocumentCard type='documento' title='Documento 1' id='1' />
                <DocumentCard type='documento' title='Documento 1' id='1' />
                <DocumentCard type='documento' title='Documento 1' id='1' />
                <DocumentCard type='documento' title='Documento 1' id='1' />
            </Row>
        </Container>
    );
}

export default Home;
