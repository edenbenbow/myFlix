import React from "react";
import "./navbar.scss";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * Shows navigation bar
 * @class Navigation
 * @returns {Navigation}
 */

export class Navigation extends React.Component {

    /**
     * Logs out user
     * @function onLogout
     * @param token
     * @param user
     */

    onLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        //localStorage.removeItem('movies');
        this.setState({
            user: null
        });
        window.open("/client", "_self");
    }

    render() {
        const { user } = this.props;
        //if (!user) return null;
        //console.log("this.props: " + JSON.stringify(this.props));

        let userMenu, logoutButton, navLinks;

        if (user) {
            userMenu = (
                <Nav>
                    <NavDropdown title={user} id="account-dropdown">
                        <NavDropdown.Item href={`/client/users/${user}`}>Account</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            );
            logoutButton = (
                <Nav>
                    <Button className="logout" onClick={() => this.onLogout()}>
                        Logout
                    </Button>
                </Nav>
            );
            navLinks = (
                <Nav className="mr-auto">
                    <Nav.Link href="/client">Movies</Nav.Link>
                </Nav>
            );
        }

        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand>
                    <h1>Watchr</h1>
                </Navbar.Brand>
                {navLinks}
                {userMenu}
                {logoutButton}
            </Navbar>
        );
    }
}

export default Navigation;

Navigation.propTypes = {
    user: PropTypes.string
};
