import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardDeck, Container } from 'react-bootstrap';
import axios from "axios";
import './profile-movie-card.scss';


import { Link } from "react-router-dom";


export class ProfileMovieCard extends React.Component {

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

    render() {
        const { movie, user } = this.props;

        if (!movie || !user) return null;

        return (

                <Card style={{ minWidth: '240px', maxWidth:'240px' }}>
                  <Card.Img variant="top" src={movie.ImagePath} />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Link to={`/movies/${movie._id}`}>
                      <Button className="card-button" variant="link">Learn more</Button>
                      <Button variant="outline-secondary" size='sm' className="remove-button" onClick={this.removeFavorite.bind(this)}>Remove</Button>
                    </Link>
                  </Card.Body>
                </Card>

        );
  }
}


ProfileMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string, // isRequired
    imagePath: PropTypes.string, //isrequired
    genre: PropTypes.string //isRequired
  }).isRequired //,
  //onClick: PropTypes.func.isRequired
};
