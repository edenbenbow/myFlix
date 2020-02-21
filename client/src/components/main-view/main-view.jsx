import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies, setUser, setUsers } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";
import LoginView from "../login-view/login-view";
import MovieView from "../movie-view/movie-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import UserView from "../user-view/user-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Navigation } from "../navbar/navbar";

export class MainView extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            users: [],
            user: null
        };
    }

    getMovies(token) {
        axios
            .get("https://watchrdb.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                // Assign the result to the state
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUsers(token) {
        axios
            .get("https://watchrdb.herokuapp.com/users", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                this.props.setUsers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUser(token) {
        axios
            .get("https://watchrdb.herokuapp.com/users", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                this.props.setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem("user")
            });
            this.getMovies(accessToken);
            this.getUsers(accessToken);
        }
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });
        this.props.setUser(authData.user);
        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
        this.getUsers(authData.token);
    }

    render() {
        let { movies, users } = this.props;
        let { user } = this.state;

        return (
            <Container className="main-view">
                <Navigation user={user} />
                <Router basename="/client">
                    <div className="main-view">
                        <Route
                            exact
                            path="/"
                            render={() => {
                                if (!user) {
                                    return (
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    );
                                }
                                return <MoviesList movies={movies} />;
                            }}
                        />
                        <Route path="/register" render={() => <RegistrationView />} />
                        <Route
                            path="/movies/:movieId"
                            render={({ match }) => (
                                <MovieView
                                    user={users.find(u => u.Username === user)}
                                    movie={movies.find(m => m._id === match.params.movieId)}
                                />
                            )}
                        />
                        <Route
                            path="/genres/:name"
                            render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <GenreView genreName={match.params.name} />;
                            }}
                        />
                        <Route
                            path="/directors/:name"
                            render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <DirectorView directorName={match.params.name} />;
                            }}
                        />
                        <Route
                            path="/users/:username"
                            render={({ match }) => (
                                <UserView username={match.params.username} />
                            )}
                        />
                    </div>
                </Router>
            </Container>
        );
    }
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        users: state.users
    };
};

const mapDispatchToProps = {
    setMovies,
    setUser,
    setUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

MainView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.object
    }),
    directorName: PropTypes.shape({
        name: PropTypes.string
    }),
    genreName: PropTypes.shape({
        name: PropTypes.string
    }),
    user: PropTypes.shape({
        username: PropTypes.string
    })
};
