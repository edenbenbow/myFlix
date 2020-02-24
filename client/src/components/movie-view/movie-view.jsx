import React from "react";
import PropTypes from "prop-types";

import { Button, Card, Container, Form, ListGroup } from "react-bootstrap";
import "./movie-view.scss";

import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";

function MovieView(props) {
  const { user, movie, movies } = props;

  if (!user || !movies || !movies.length) return null;

  function addFavorite(event) {
    event.preventDefault();
    axios
      .post(
        `https://watchrdb.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        { Username: localStorage.getItem("user") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        alert(`${movie.Title} has been successfully added!`);
        document.location.reload(true);
      })
      .catch(error => {
        alert(
          `We were unable to add ${movie.Title} to your favorites: ` + error
        );
      });
  }

  function removeFavorite(event) {
    event.preventDefault();
    axios
      .delete(
        `https://watchrdb.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        alert(`${movie.Title} has been removed from favorites`);
        document.location.reload(true);
      })

      .catch(error => {
        alert("Unable to remove movie from favorites: " + error);
      });
  }

  function goBack() {
    window.location = "/client";
  }

  return (
    <Card style={{ width: "10 rem" }}>
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <ListGroup varient="flush">
          <ListGroup.Item>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
              {user.FavoriteMovies.includes(movie._id) ? (
                <Button
                  onClick={removeFavorite}
                  variant="outline-secondary"
                  id="remove"
                >
                  Unfavorite
                    </Button>
              ) : (
                  <Button onClick={addFavorite} variant="warning">
                    Favorite
                    </Button>
                )}
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
            <button className="back-to-main" onClick={goBack}>
              Browse all movies
              </button>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Card>
  );
}

export default connect(({ movies }) => ({ movies }))(MovieView);

MovieView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string
  }),
  movie: PropTypes.shape({
    _id: PropTypes.string,
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.exact({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired
};
