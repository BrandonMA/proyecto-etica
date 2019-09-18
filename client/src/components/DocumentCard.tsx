import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Col from 'react-bootstrap/Col';

interface Props {
    title: string,
    type: string,
    id: string
}

const DocumentCard: React.FunctionComponent<Props> = (props) => {
    return(
        <Col lg={3}>
            <Card>
                <Card.Header>{props.type}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <LinkContainer to={'/' + props.type + '/' + props.id }>
                        <Button variant="primary">Go somewhere</Button>
                    </LinkContainer>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default DocumentCard;
