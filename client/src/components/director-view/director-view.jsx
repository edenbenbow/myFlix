import React from 'react';
import {Card, Button, CardDeck, ListGroup} from 'react-bootstrap';

import './director-view.scss';

import { connect } from 'react-redux';
import MoviesList from '../movies-list/movies-list';


function DirectorView(props) {
    const {movies, director} = props;

    if (!movies || !movies.length) return null;

    return (
      <Card style={{ width: '10 rem'}}>
                <div className="director-view">
                    <ListGroup varient="flush">
                        <ListGroup.Item>
                            <div className="director-name">
                                <h2 className="value">{director.Name}</h2>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="director-birth">
                                <span className="label">Birth date: </span>
                                <span className="value">{director.Birth}</span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="director-birth">
                                <span className="label">Bio: </span>
                                <span className="value">{director.Bio}</span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="movies-list">
                                <span className="label">Movies: </span>
                                <span className="value">
                                  <MoviesList movies={movies}/>
                                </span>
                            </div>
                        </ListGroup.Item>

                  </ListGroup>
                </div>
            </Card>

        );
    }

let mapStateToProps = state => {
    return { movies: state.movies }
};

export default connect(({ movies }) => ({ movies }))(DirectorView);