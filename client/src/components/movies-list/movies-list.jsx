import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CardDeck, Container } from "react-bootstrap";
import "./movies-list.scss";

import { MovieCard } from "../movie-card/movie-card";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== "") {
        filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
    }

    if (!movies) return <div className="main-view" />;

    return (
        <Container>
            <VisibilityFilterInput id="filterField" />
            <CardDeck className="movie-card">
                {filteredMovies.map(m => (
                    <MovieCard key={m._id} movie={m} />
                ))}
            </CardDeck>
        </Container>
    );
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
    Movie: PropTypes.shape({
        Title: PropTypes.string
    })
};
