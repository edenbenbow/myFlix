import React, {useState} from 'react';
import {Button, Card, CardDeck, Form, ListGroup} from 'react-bootstrap';
import './user-view.scss';

import {MovieCard} from '../movie-card/movie-card';
import {ProfileMovieCard} from '../user-view/profile-movie-card';
import axios from "axios";

export class UserView extends React.Component {

  constructor(props) {
    super(props);
    //console.log("constructor props: " + JSON.stringify(props));
    this.state = {};

    this.state = {
      isUsernameEditable: false,
      isEmailEditable: false,
      isPasswordEditable: false,
      isBirthdayEditable: false,
      newUserPassword: ''
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.state.copyOfUserProfile = this.props.userProfile ? this.props.userProfile : undefined;
  }

  newUsername(event) {
    const { userProfile, user } = this.props;
    event.preventDefault();
    const updatedUserObject = {
      username: this.state.copyOfUserProfile.Username,
      email: this.state.copyOfUserProfile.Email,
      birthday: this.state.copyOfUserProfile.Birthday
    };
    axios.put(`https://watchrdb.herokuapp.com/users/${user}`,
        updatedUserObject,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
        .then(response => {
          alert('Username has been successfully updated. Please log in with your new account information.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          //localStorage.removeItem('movies');
          this.setState({
            user: null
          });
          window.open('/', '_self');
          //document.location.reload(true);
        })
        .catch(error => {
          alert(`We were unable to update ${userProfile.Username}: ` + error);
        });
  };

  updateUsername(e) {
    console.log("updateUsername called: " + e.target.value);
    this.state.copyOfUserProfile.Username = e.target.value;
    this.setState({copyOfUserProfile: this.state.copyOfUserProfile})
  }

  newBirthday(event) {
    const { userProfile } = this.props;
    event.preventDefault();
    const updatedUserObject = {
      username: this.state.copyOfUserProfile.Username,
      email: this.state.copyOfUserProfile.Email,
      birthday: this.state.copyOfUserProfile.Birthday
    };
    axios.put(`https://watchrdb.herokuapp.com/users/${userProfile.Username}`,
        updatedUserObject,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
        .then(response => {
          alert('Birthday has been successfully updated!');
          document.location.reload(true);
        })
        .catch(error => {
          alert(`We were unable to update ${userProfile.Birthday}: ` + error);
        });
  };

  updateBirthday(e) {
    console.log("updateBirthday called: " + e.target.value);
    this.state.copyOfUserProfile.Birthday = e.target.value;
    this.setState({copyOfUserProfile: this.state.copyOfUserProfile})
  }

  newEmail(event) {
    const { userProfile } = this.props;
    event.preventDefault();
    const updatedUserObject = {
      username: this.state.copyOfUserProfile.Username,
      email: this.state.copyOfUserProfile.Email,
      //password: this.state.copyOfUserProfile.Password,
      birthday: this.state.copyOfUserProfile.Birthday,
    };
    axios.put(`https://watchrdb.herokuapp.com/users/${userProfile.Username}`,
        updatedUserObject,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
        .then(response => {
          alert('Email has been successfully updated!');
          document.location.reload(true);
        })
        .catch(error => {
          alert(`We were unable to update ${userProfile.Email}: ` + error);
        });
  };

  updateEmail(e) {
    console.log("updateEmail called: " + e.target.value);
    this.state.copyOfUserProfile.Email = e.target.value;
    this.setState({copyOfUserProfile: this.state.copyOfUserProfile})
  }

  newPassword(event) {
    console.log("newPassword[copyOfUserProfile]1: " + JSON.stringify(this.state.copyOfUserProfile));
    const { userProfile } = this.props;
    event.preventDefault();
    const updatedUserObject = {
      username: this.state.copyOfUserProfile.Username,
      email: this.state.copyOfUserProfile.Email,
      password: this.state.newUserPassword,
      birthday: this.state.copyOfUserProfile.Birthday,
    };
    axios.put(`https://watchrdb.herokuapp.com/users/${userProfile.Username}`,
        updatedUserObject,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
        .then(response => {
          alert('Password has been successfully updated!');
          document.location.reload(true);
        })
        .catch(error => {
          alert(`We were unable to update ${userProfile.Password}: ` + error);
        });
  };

  updatePassword(event) {
    this.setState({newUserPassword: event.target.value});
  }

  cancelEdit() {
    //window.location.reload(false);
    this.setState({isUsernameEditable: false, isEmailEditable: false, isPasswordEditable: false, isBirthdayEditable: false})
  }

  render() {
    const { user, userProfile, movies } = this.props;

    //console.log("[user-view] this.props: " + JSON.stringify(this.props));


    const usernameEdit = (e) => {
      this.setState({
        isUsernameEditable: true
      })
    }

    const emailEdit = (e) => {
      this.setState({
        isEmailEditable: true
      })
    }

    const passwordEdit = (e) => {
      this.setState({
        isPasswordEditable: true
      })
    }

    const birthdayEdit = (e) => {
      this.setState({
        isBirthdayEditable: true
      })
    }

    let userEmail = "test";
    let userUsername = "test";
    let userBirthday = "test";
    let userPassword = "test";

    const deleteAccount = (event) => {
      const { userProfile } = this.props;
      event.preventDefault();
      axios.delete(`https://watchrdb.herokuapp.com/users/${userProfile.Username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
          .then(response => {
            alert('Your account has been deleted');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.open('/', '_self');
          })
          .catch(error => {
            alert('Unable to delete account');
          });
    }

    if (!userProfile || !movies) return null;

    let filteredMovies = movies.filter(m => userProfile.FavoriteMovies.includes(m._id) );
    //console.log("filteredMovies: " + JSON.stringify(filteredMovies));

    let usernameField;
    let emailField;
    let passwordField;
    let birthdayField;

    if (this.state.isUsernameEditable) {
      usernameField = <Form.Group controlId="formBasicUsername" className="profileField">
        <Form.Control
            type="text"
            placeholder="Enter username"
            value={this.state.copyOfUserProfile.Username}
            onChange={this.updateUsername.bind(this)}
        />
        <Button variant="danger" onClick={this.newUsername.bind(this)} size="sm">Save</Button>
        <Button variant="link" className='cancel' onClick={this.cancelEdit.bind(this)}>Cancel</Button>
      </Form.Group>
    } else {
      usernameField = <span className="value">{userProfile.Username}</span>;
    }

    if (this.state.isEmailEditable) {
      emailField = <Form.Group controlId="formBasicEmail" className="profileField">
        <Form.Control
            type="text"
            placeholder="Enter email"
            value={this.state.copyOfUserProfile.Email}
            onChange={this.updateEmail.bind(this)}
        />
        <Button variant="danger" onClick={this.newEmail.bind(this)} size="sm">Save</Button>
        <Button variant="link" className='cancel' onClick={this.cancelEdit.bind(this)}>Cancel</Button>
      </Form.Group>
    } else {
      emailField = <span className="value">{userProfile.Email}</span>;
    }

    if (this.state.isPasswordEditable) {
      passwordField = <Form.Group controlId="formBasicPassword" className="profileField">
        <Form.Control
            type="text"
            placeholder="Enter Password"
            value={this.state.newUserPassword}
            onChange={this.updatePassword.bind(this)}
        />
        <Button variant="danger" onClick={this.newPassword.bind(this)} size="sm">Save</Button>
        <Button variant="link" className='cancel' onClick={this.cancelEdit.bind(this)}>Cancel</Button>
      </Form.Group>
    } else {
      passwordField = <span className="value">********</span>;
    }


    if (this.state.isBirthdayEditable) {
      birthdayField = <Form.Group controlId="formBasicBirthday" className="profileField">
        <Form.Control
            type="text"
            placeholder="Enter date of birth"
            value={this.state.copyOfUserProfile.Birthday}
            onChange={this.updateBirthday.bind(this)}
        />
        <Button variant="danger" onClick={this.newBirthday.bind(this)} size="sm">Save</Button>
        <Button variant="link" className='cancel' onClick={this.cancelEdit.bind(this)}>Cancel</Button>
      </Form.Group>
    } else {
      birthdayField = <span className="value">{userProfile.Birthday}</span>;
  }

      return (
        <Card style={{ width: '20 rem'}}>
          <div className="user-view">
            <ListGroup varient="flush">
              <ListGroup.Item>
                <div className="username">
                  <span className="label">Username: </span>
                  {usernameField}
                  {this.state.isUsernameEditable || this.state.isPasswordEditable || this.state.isEmailEditable || this.state.isBirthdayEditable ? null : <Button variant="link" onClick={usernameEdit} size="sm" className="editButton">Edit</Button>}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="user-email">
                  <span className="label">Password: </span>
                  {passwordField}
                  {this.state.isUsernameEditable || this.state.isPasswordEditable || this.state.isEmailEditable || this.state.isBirthdayEditable ? null : <Button variant="link" onClick={passwordEdit} size="sm" className="editButton">Edit</Button>}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="user-email">
                  <span className="label">Email: </span>
                  {emailField}
                  {this.state.isUsernameEditable || this.state.isPasswordEditable || this.state.isEmailEditable || this.state.isBirthdayEditable ? null : <Button variant="link" onClick={emailEdit} size="sm" className="editButton">Edit</Button>}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="user-birthday">
                  <span className="label">Birthday: </span>
                  {birthdayField}
                  {this.state.isUsernameEditable || this.state.isPasswordEditable || this.state.isEmailEditable || this.state.isBirthdayEditable ? null : <Button variant="link" onClick={birthdayEdit} size="sm" className="editButton">Edit</Button>}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="user-movies">
                  <span className="label">Favorite movies:</span>
                  <span className="value">

                    { filteredMovies.length === 0 ?
                        <span>&nbsp;No favorites selected</span> :
                        <CardDeck>
                          {
                            filteredMovies.map(m => (
                                <ProfileMovieCard key={m._id} user={userProfile} movie={m} />
                            ))
                          }
                        </CardDeck>
                    }

                  </span>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <div className="delete-account">
                <Button variant="light" onClick={deleteAccount} size="sm">Delete account</Button>
              </div>
            </ListGroup.Item>
          </div >
        </Card>
      );
  }
}