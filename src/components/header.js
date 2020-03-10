import React from "react";

import {Container, Navbar, Nav, Form, Button} from "react-bootstrap";
import logo from "../img/logo192.png";

export class Header extends React.Component {
    render() {
        return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            alt="logo"
                            height="30"
                            width="30"
                            className="d-inline-block align-top"
                        />{" "}
                        React
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" >First</Nav.Link>
                            <Nav.Link href="/second" >Second</Nav.Link>
                            <Nav.Link href="/third" >Third</Nav.Link>
                            <Nav.Link href="/fourth" >Fourth</Nav.Link>
                        </Nav>
                        <Form inline >
                            <Button variant="outline-light">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
        );
    }
}

export default Header;