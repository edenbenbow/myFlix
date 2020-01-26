import React from 'react';
import axios from 'axios';
import { Container, CardDeck, Navbar} from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navigation } from '../navbar/navbar';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        let url_root = 'https://watchrdb.herokuapp.com';
        axios.get(`${url_root}/movies`)
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }


    render() {
        const { movies, selectedMovie, user } = this.state;

        if (window.location.pathname === '/users') {
            return <RegistrationView />
        }

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        if (!movies) return <div className="main-view" />;

        return (
            <Container className="main-view">
                    <Navigation/>

                <Container>
                    <CardDeck>

                    {selectedMovie
                    ? <MovieView movie={selectedMovie} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))
                    }

                    </CardDeck>
                </Container>

                </Container>


        );
    }
}