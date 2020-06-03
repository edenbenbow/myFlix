import React from "react";
import PropTypes from "prop-types";
import { Card, Button, CardDeck, ListGroup } from "react-bootstrap";

import "./director-view.scss";

import { connect } from "react-redux";
import MoviesList from "../movies-list/movies-list";

/**
 * Shows director information
 * @function DirectorView
 * @param {string} props
 * @returns {DirectorView}
 */

function DirectorView(props) {
    const { movies, directorName } = props;

    if (!movies || !movies.length) return null;

    let filteredMovies = movies.filter(m => m.Director.Name === directorName);

    return (
        <Card style={{ width: "10 rem" }}>
            <div className="director-view">
                <ListGroup varient="flush">
                    <ListGroup.Item>
                        <div className="director-name">
                            <h2 className="value">{filteredMovies[0].Director.Name}</h2>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="director-birth">
                            <span className="label">Birth date: </span>
                            <span className="value">{filteredMovies[0].Director.Birth}</span>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="director-birth">
                            <span className="label">Bio: </span>
                            <span className="value">{filteredMovies[0].Director.Bio}</span>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="movies-list">
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

let mapStateToProps = state => {
    return { movies: state.movies };
};

export default connect(({ movies }) => ({ movies }))(DirectorView);

DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string
    }).isRequired
};
