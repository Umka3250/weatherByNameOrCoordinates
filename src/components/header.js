import React from "react";
import {NavLink} from "react-router-dom";

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
                            <Nav.Link>
                                <NavLink
                                    exact
                                    to="/"
                                    className="text-decoration-none navbar-link-color"
                                    activeClassName={'wfm-active'}
                                >
                                    Home Page
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink
                                    exact
                                    to="/second"
                                    className="text-decoration-none navbar-link-color"
                                    activeClassName={'wfm-active'}
                                >
                                    Page for cars
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink
                                    exact
                                    to="/third"
                                    className="text-decoration-none navbar-link-color"
                                    activeClassName={'wfm-active'}
                                >
                                    Third Page
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink
                                    exact
                                    to="/fourth"
                                    className="text-decoration-none navbar-link-color"
                                    activeClassName={'wfm-active'}
                                >
                                    Fourth Page
                                </NavLink>
                            </Nav.Link>
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