import React from 'react';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Navbar: React.FunctionComponent<{}> = () => {
    return(
        <BootstrapNavbar bg="light" expand="lg">
            <BootstrapNavbar.Brand href="#home">Nombre de la página</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to='/home'>
                        <Nav.Link>Inicio</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/video-library'>
                        <Nav.Link>Videoteca</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/blog'>
                        <Nav.Link>Línea abierta</Nav.Link>
                    </LinkContainer>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
}

export default Navbar;
