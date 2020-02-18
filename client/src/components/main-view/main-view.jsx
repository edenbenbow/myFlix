import React from 'react';
import axios from 'axios';
import { Container, Navbar} from 'react-bootstrap';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route} from "react-router-dom";

// #0

import { setMovies, setSort, setUser, setFilter, setUsers } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
//import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navigation } from '../navbar/navbar';
import DirectorView from '../director-view/director-view';
import GenreView  from '../genre-view/genre-view';
import { UserView } from '../user-view/user-view';

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
        axios.get('https://watchrdb.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
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
        axios.get('https://watchrdb.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(response => {
                // Assign the result to the state
                this.props.setUsers(response.data);
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
                //this.props.setLoggedUser(response.data);
                this.props.setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });
        this.props.setUser(authData.user);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        //this.getUsers(authData.token);
    }



    render() {
        //const { movies, user, users, userInfo, token } = this.state;
        let { movies, users } = this.props;
        let { user } = this.state;


        //if (!movies) return <div className="main-view"/>;

        return (
          <Container className="main-view">
            <Navigation user={user}/>
              <Router>
                <div className="main-view">
                    <Route exact path="/" render={() => {
                    if (!user) {
                      return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                    }
                      return (<MoviesList movies={movies}/>)
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

let mapStateToProps = state => {
    return {
        movies: state.movies,
        users: state.users,
    }

};

const mapDispatchToProps = {
    setMovies,
    setUser,
    setUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
