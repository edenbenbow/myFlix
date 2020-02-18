import React from 'react';
import {Card, ListGroup, Button, CardDeck} from 'react-bootstrap';

import './genre-view.scss';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import MoviesList from '../movies-list/movies-list';



function GenreView(props) {
    const { genreMovie, movies } = props;
    //console.log("this.props: " + JSON.stringify(this.props));

    if (!genreMovie) return null;

    return (
      <Card style={{ width: '20 rem'}}>
        <div className="genre-view">
          <ListGroup varient="flush">
            <ListGroup.Item>
              <div className="genre-name">
                <h2 className="value">{genreMovie.Genre.Name}</h2>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="genre-description">
                <span className="label">Description: </span>
                <span className="value">{genreMovie.Genre.Description}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="genre-description">
                <span className="label">Movies: </span>
                <span className="value">
                  <CardDeck>
                    return (<MoviesList movies={movies}/>)
                  </CardDeck>
                </span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Card>

    );
}

export default connect(({movies}) => ({movies}))(GenreView);