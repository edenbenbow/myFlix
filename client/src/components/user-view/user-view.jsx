import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardDeck, Form, ListGroup} from 'react-bootstrap';
import './user-view.scss';

import ProfileMovieCard from '../user-view/profile-movie-card';
import axios from "axios";

import { connect } from 'react-redux';


export class UserView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.state = {
      isUsernameEditable: false,
      isEmailEditable: false,
      isPasswordEditable: false,
      isBirthdayEditable: false,
      newUserPassword: '',
      newUsername: ''
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.users || !this.props.user) return;
    let userProfile = this.props.users.find(u => u.Username === this.props.username);

    if (!prevProps.users.length && userProfile) {
      this.state.copyOfUserProfile = {};
      Object.keys(userProfile).forEach((k) => {
        if (!(userProfile).hasOwnProperty(k)) return;
        this.state.copyOfUserProfile[k] = userProfile[k];
      });
    }
  }

  newUsername(event) {
    const { username } = this.props;
    event.preventDefault();
    const updatedUserObject = {
      username: this.state.copyOfUserProfile.Username,
      email: this.state.copyOfUserProfile.Email,
      birthday: this.state.copyOfUserProfile.Birthday
    };
    axios.put(`https://watchrdb.herokuapp.com/users/${username}`,
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
          alert(`We were unable to update username: ` + error);
        });
  };

  updateUsername(e) {
    this.state.copyOfUserProfile.Username = e.target.value;
    this.setState({copyOfUserProfile: this.state.copyOfUserProfile})
  }

  newBirthday(event) {
    const { username } = this.props;
    event.preventDefault();
    const updatedUserObject = {
      username: this.state.copyOfUserProfile.Username,
      email: this.state.copyOfUserProfile.Email,
      birthday: this.state.copyOfUserProfile.Birthday
    };
    axios.put(`https://watchrdb.herokuapp.com/users/${username}`,
        updatedUserObject,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
        .then(response => {
          alert('Birthday has been successfully updated!');
          document.location.reload(true);
        })
        .catch(error => {
          alert(`We were unable to update user's birthday: ` + error);
        });
  };

  updateBirthday(e) {
    this.state.copyOfUserProfile.Birthday = e.target.value;
    this.setState({copyOfUserProfile: this.state.copyOfUserProfile})
  }

  newEmail(event) {
    const { username } = this.props;
    event.preventDefault();
    const updatedUserObject = {
      username: this.state.copyOfUserProfile.Username,
      email: this.state.copyOfUserProfile.Email,
      //password: this.state.copyOfUserProfile.Password,
      birthday: this.state.copyOfUserProfile.Birthday,
    };
    axios.put(`https://watchrdb.herokuapp.com/users/${username}`,
        updatedUserObject,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
        .then(response => {
          alert('Email has been successfully updated!');
          document.location.reload(true);
        })
        .catch(error => {
          alert(`We were unable to update email: ` + error);
        });
  };

  updateEmail(e) {
    this.state.copyOfUserProfile.Email = e.target.value;
    this.setState({copyOfUserProfile: this.state.copyOfUserProfile})
  }

  newPassword(event) {
    const { username } = this.props;
    event.preventDefault();
    const updatedUserObject = {
      username: this.state.copyOfUserProfile.Username,
      email: this.state.copyOfUserProfile.Email,
      password: this.state.newUserPassword,
      birthday: this.state.copyOfUserProfile.Birthday,
    };
    axios.put(`https://watchrdb.herokuapp.com/users/${username}`,
        updatedUserObject,
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
        .then(response => {
          alert('Password has been successfully updated!');
          document.location.reload(true);
        })
        .catch(error => {
          alert(`We were unable to update password: ` + error);
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
    const { user, movies, users, username } = this.props;



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
      const { username } = this.props;
      event.preventDefault();
      axios.delete(`https://watchrdb.herokuapp.com/users/${username}`, {
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
    };

    if (!movies || !user || !users || !username || !users.length) return null;

    let userProfile = users.find(u => u.Username === username);
    let filteredMovies = userProfile.FavoriteMovies ? movies.filter(m => userProfile.FavoriteMovies.includes(m._id) ) : [];

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
                        <CardDeck id="favorites">
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

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user,
    users: state.users
  }
};


export default connect(mapStateToProps, null /*mapDispatchToProps*/)(UserView);

UserView.propTypes = {
  userProfile: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array
  })
};