import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import "./login-view.scss";
import PropTypes from "prop-types";
import axios from "axios";

import { connect } from "react-redux";
import { setUser } from "../../actions/actions";
import { Link } from "react-router-dom";

export function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios
            .post("https://watchrdb.herokuapp.com/login", {
                username: username,
                password: password
            })
            .then(response => {
                const data = response.data;
                props.setUser(localStorage.getItem("user"));
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log("no such user");
                console.log("err: " + e);
            });
    };

    return (
        <Container>
            <Form className="login-form">
                <h2>Sign into your account</h2>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control
                        type="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Sign in
                </Button>

                <Link to={`/register`}>
                    <Button variant="outline-secondary" className="login">
                        Create account
                    </Button>
                </Link>
            </Form>
        </Container>
    );
}

export default connect(({ user }) => ({ user }), { setUser })(LoginView);

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};
