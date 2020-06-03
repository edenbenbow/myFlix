import React from "react";
import { Card, ListGroup, Button, CardDeck } from "react-bootstrap";

import "./genre-view.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MoviesList from "../movies-list/movies-list";
import PropTypes from "prop-types";

/**
 * Shows genre information
 * @function GenreView
 * @param {string} props
 * @returns {GenreView}
 */

function GenreView(props) {
    const { movies, genreName } = props;
    //console.log("this.props: " + JSON.stringify(this.props));

    if (!movies || !movies.length || !genreName) return null;

    let filteredMovies = movies.filter(m => m.Genre.Name === genreName);

    return (
        <Card style={{ width: "20 rem" }}>
            <div className="genre-view">
                <ListGroup varient="flush">
                    <ListGroup.Item>
                        <div className="genre-name">
                            <h2 className="value">{filteredMovies[0].Genre.Name}</h2>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="genre-description">
                            <span className="label">Description: </span>
                            <span className="value">
                {filteredMovies[0].Genre.Description}
              </span>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="genre-description">
                            <span className="label">Movies: </span>
                            <span className="value">
                  <MoviesList movies={filteredMovies} />
              </span>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </Card>
    );
}

export default connect(({ movies }) => ({ movies }))(GenreView);

GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }).isRequired
};
