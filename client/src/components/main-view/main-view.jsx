import React from 'react';
import axios from 'axios';
import { Container, CardDeck, Navbar} from 'react-bootstrap';

import { BrowserRouter as Router, Route} from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navigation } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { UserView } from '../user-view/user-view';
import { ProfileMovieCard } from '../user-view/profile-movie-card';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            user: null,
            users: []
        };
    }

    getMovies(token) {
        axios.get('https://watchrdb.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUser(token) {
        axios.get('https://watchrdb.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setLoggedUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getUsers(token) {
        axios.get('https://watchrdb.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    users: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUsers(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }



    render() {
        const { movies, user, users, userInfo, token } = this.state;


        if (!movies) return <div className="main-view"/>;

        return (
          <Container className="main-view">
            <Navigation user={user}/>
              <Router>
                <div className="main-view">
                    <Route exact path="/" render={() => {
                    if (!user) {
                      return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                    }
                      return (
                        <Container>
                          <CardDeck>
                            {
                              movies.map(m => (
                                <MovieCard key={m._id} movie={m} />
                              ))
                            }
                          </CardDeck>
                        </Container>
                            )
                        }}/>
                        <Route path="/register" render={() => <RegistrationView />} />
                        <Route path="/movies/:movieId" render={({match}) =>
                            <MovieView
                                user={users.find(u => u.Username === user)}
                                movie={movies.find(m => m._id === match.params.movieId)}
                            />
                        }/>
                        <Route path="/genres/:name" render={({match}) => {
                            if (!movies) return <div className="main-view"/>;
                            return <GenreView
                                genreMovie={movies.find(m => m.Genre.Name === match.params.name)}
                                movies={movies.filter(m => m.Genre.Name === match.params.name)}
                            />}
                        } />
                        <Route path="/directors/:name" render={({ match }) => {
                          if (!movies) return <div className="main-view"/>;
                          return <DirectorView
                              director={movies.length ? movies.find(m => m.Director.Name === match.params.name).Director : undefined}
                              movies={movies.filter(m => m.Director.Name === match.params.name)}
                          />}
                        } />
                        <Route path="/users/:username" render={({match}) => <
                            UserView movies={movies}
                            userProfile={users.find(u => u.Username === match.params.username)}
                            user={user}
                        />} />
                 </div>
                </Router>
          </Container>
        );
    }
}
