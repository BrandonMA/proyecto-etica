import React from 'react';
import Container from 'react-bootstrap/Container';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

interface Props {
    title: string,
    type: string,
    id: string,
    text: string
}

const Home: React.FunctionComponent<{}> = () => {
    return(
        <Container>
            <h1 className='text-center'>Titulo del video</h1>
            <ResponsiveEmbed aspectRatio="16by9">
                <iframe src='https://www.youtube.com/embed/LYa_ReqRlcs' frameBorder='0'allow='autoplay; encrypted-media' allowFullScreen title='video'/>
            </ResponsiveEmbed>
        </Container>
    );
}

export default Home;
