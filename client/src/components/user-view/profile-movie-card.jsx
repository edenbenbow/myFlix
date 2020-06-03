import React from "react";
import PropTypes from "prop-types";
import { Card, Button, CardDeck, Container } from "react-bootstrap";
import axios from "axios";
import "./profile-movie-card.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

/**
 * Shows individual movie information
 * @function ProfileMovieCard
 * @param {string} props
 * @returns {ProfileMovieCard}
 */


function ProfileMovieCard(props) {
    const { user, movie, movies } = props;

    if (!user || !movies || !movies.length) return null;

    /**
     * Removes movie from user favorites
     * @function removeFavorite
     * @param event
     */

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

    return (
        <Card style={{ minWidth: "240px", maxWidth: "240px" }}>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Link to={`/movies/${movie._id}`}>
                    <Button className="card-button" variant="link">
                        Learn more
                    </Button>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="remove-button"
                        onClick={removeFavorite}
                    >
                        Remove
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default connect(({ movies }) => ({ movies }))(ProfileMovieCard);

ProfileMovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        imagePath: PropTypes.string,
        genre: PropTypes.string
    }).isRequired
};
