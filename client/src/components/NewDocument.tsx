import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import LoadingButton from './LoadingButton';

interface Props {
    show: boolean,
    onHide: () => void,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    loading: boolean,
    title: string
}

const NewDocument: React.FunctionComponent<Props> = (props) => {
    return(
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.onSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type='text' name='name' required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contenido</Form.Label>
                        <Form.Control as="textarea" rows="3" name='content' required></Form.Control>
                    </Form.Group>
                    <LoadingButton
                        spinnerVariant='dark'
                        variant='light'
                        disabled={props.loading}
                        loading={props.loading}
                        title='Añadir documento'/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default NewDocument;
