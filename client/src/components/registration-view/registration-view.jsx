import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';
import { Navigation } from '../navbar/navbar';



export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
//  }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, birthday, email);
        /* Send a request to the server for authentication */
        axios.post('https://watchrdb.herokuapp.com/users', {
            username: username,
            password: password,
            birthday: birthday,
            email: email,
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            alert('registration successful, please log in.');
            window.open('/');
        })
        .catch(e => {
            console.log('error registering user');
        });
    };

    return (
        <Container>
            <Navigation/>
            <Form className="registration-form">
                {/*<img src={logo} alt="logo" style={{ width: "300px" }} />*/}
                <h2>Create an account</h2>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="text"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicBirthday">
                    <Form.Control
                        type="text"
                        placeholder="Enter Date of Birth"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Sign up
                </Button>
            </Form>
        </Container>
    );
}