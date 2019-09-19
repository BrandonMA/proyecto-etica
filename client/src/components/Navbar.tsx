import React from 'react';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Navbar: React.FunctionComponent<{}> = () => {
    return(
        <BootstrapNavbar id='Navbar' bg="dark" expand="lg" variant="dark">
            <BootstrapNavbar.Brand>Nombre de la página</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to='/documents'>
                        <Nav.Link>Documentos</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/videos'>
                        <Nav.Link>Videoteca</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/blogs'>
                        <Nav.Link>Línea abierta</Nav.Link>
                    </LinkContainer>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
}

export default Navbar;
