import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardDeck, Container } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (

            <Card style={{ minWidth: '240px', maxWidth:'240px' }}>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => onClick(movie)} variant="link">Learn more</Button>
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
