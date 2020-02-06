import React from 'react';
import {Button, Card, Container, Form, ListGroup} from 'react-bootstrap';
import './movie-view.scss';

import { Link } from 'react-router-dom';
import axios from "axios";

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.state = {
      isFavoriteSelected: false,
    };
  }

  addFavorite(event) {
    const { user, movie } = this.props;
    event.preventDefault();
    axios.post(`https://watchrdb.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {Username: localStorage.getItem('user')},
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
    .then(response => {
          alert(`${movie.Title} has been successfully added!`);
          document.location.reload(true);
    })
    .catch(error => {
          alert(`We were unable to add ${movie.Title} to your favorites: ` + error);
    });
  };

  removeFavorite(event) {
    const { user, movie } = this.props;
    event.preventDefault();
    axios.delete(`https://watchrdb.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
        .then(response => {
          alert(`${movie.Title} has been removed from favorites`);
          document.location.reload(true);
        })

        .catch(error => {
          alert('Unable to remove movie from favorites: ' + error)
        });
  }

  goBack() {
    window.location = '/';
  }

  render() {
    //console.log("this.props: " + JSON.stringify(this.props));
    const { movie, user } = this.props;

    const favoriteEdit = (e) => {
      this.setState({
        isFavoriteSelected: true
      })
    }


    if (!movie || !user) return null;

    return (
      <Card style={{ width: '10 rem' }}>
        <div className="movie-view">
          <img className="movie-poster" src={movie.ImagePath} />
          <ListGroup varient="flush">
            <ListGroup.Item>
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
                {
                  //this.state.isFavoriteSelected ?
                  user.FavoriteMovies.includes(movie._id) ?
                    <Button onClick={this.removeFavorite.bind(this)} variant="outline-warning">Unfavorite</Button> :
                    <Button onClick={this.addFavorite.bind(this)} variant="warning">Favorite</Button>
                }
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    {movie.Genre.Name}
                  </Link>
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">
                  <Link to={`/directors/${movie.Director.Name}`}>
                    {movie.Director.Name}
                  </Link>
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <button className="back-to-main" onClick={this.goBack}>Browse all movies</button>
            </ListGroup.Item>
          </ListGroup>
        </div >
      </Card>
    )
    }
  }
