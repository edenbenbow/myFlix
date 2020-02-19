import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardDeck, Container } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (

            <Card className="movie-card" style={{marginTop: '20px', minWidth: '240px', maxWidth:'240px' }}>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button className="card-button" variant="link">Learn more</Button>
                </Link>
              </Card.Body>
            </Card>

    );
  }
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string, // isRequired
    imagePath: PropTypes.string, //isrequired
    genre: PropTypes.string //isRequired
  }).isRequired //,
  //onClick: PropTypes.func.isRequired
};
