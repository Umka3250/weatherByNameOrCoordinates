import React from "react";
import {NavLink} from "react-router-dom";

import {Container, Navbar, Nav, Form, Button} from "react-bootstrap";

import logo from "../img/logo192.png";

export class Header extends React.Component {
    render() {
        return (
        <>
            <Navbar
                className="sticky-top"
                collapseOnSelect
                expand="md"
                bg="dark"
                variant="dark"
            >
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
                            <NavLink
                                to="/first"
                                className="nav-link text-decoration-none navbar-link-color"
                                activeClassName={'wfm-active'}
                            >
                                Home Page
                            </NavLink>
                            <NavLink
                                to="/second"
                                className="nav-link text-decoration-none navbar-link-color"
                                activeClassName={'wfm-active'}
                            >
                                Page for cars
                            </NavLink>
                            <NavLink
                                to="/third"
                                className="nav-link text-decoration-none navbar-link-color"
                                activeClassName={'wfm-active'}
                            >
                                Third Page
                            </NavLink>
                            <NavLink
                                to="/fourth"
                                className="nav-link text-decoration-none navbar-link-color"
                                activeClassName={'wfm-active'}
                            >
                                Fourth Page
                            </NavLink>
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