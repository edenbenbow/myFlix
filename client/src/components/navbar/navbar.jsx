import React from 'react';
import './navbar.scss';
import {Nav, NavItem, Navbar} from 'react-bootstrap';


export class Navigation extends React.Component{
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="movies"><h1>Watchr</h1></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="movies">Movies</Nav.Link>
                    <Nav.Link href="#">Genres</Nav.Link>
                    <Nav.Link href="#">Directors</Nav.Link>
                    <Nav.Link href="#">Favorites</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
};

export default Navigation;