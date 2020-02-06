import React from 'react';
import {Card, Button, CardDeck, ListGroup} from 'react-bootstrap';

import './director-view.scss';

import { Link } from "react-router-dom";
import {MovieCard} from "../movie-card/movie-card";


export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log("this.props: " + JSON.stringify(this.props));
    const { director, movies } = this.props;

    if (!director) return null;
    //console.log("director: " + JSON.stringify(director));

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
                                    <CardDeck>
                                      {movies.map(m => (
                                          <MovieCard key={m._id} movie={m} />
                                      ))}
                                    </CardDeck>
                                </span>
                            </div>
                        </ListGroup.Item>

                  </ListGroup>
                </div>
            </Card>

        );
    }
}
