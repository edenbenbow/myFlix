import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import './login-view.scss';
import { Navigation } from '../navbar/navbar';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username)
    };


  return (
      <Container>
          <Navigation/>
          <Form className="login-form">
              {/* <img src={logo} alt="logo" style={{ width: "300px" }} />*/}
              <h2>Sign into your account</h2>
          <Form.Group controlId="formBasicUsername">
              <Form.Control
                  type="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
              <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
              Sign in
          </Button>
      </Form>
      </Container>
  );
}