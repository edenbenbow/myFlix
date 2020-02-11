import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardDeck, Container } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view"/>;

  return (
      <Container>
        <CardDeck>
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
        </CardDeck>
      </Container>)
}

export default connect(mapStateToProps)(MoviesList);
