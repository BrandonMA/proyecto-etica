import React from 'react';
import Container from 'react-bootstrap/Container';
import ReactMarkdown from 'react-markdown';

interface Props {
    id: string,
    content: string
}

// https://word2md.com

const input = `Primer post`;

const Home: React.FunctionComponent<{}> = () => {
    return(
        <Container>
            <h1>Titulo del post</h1>
            <p>{input}</p>
        </Container>
    );
}

export default Home;
