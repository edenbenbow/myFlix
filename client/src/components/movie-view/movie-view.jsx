import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  goBack() {
    window.location = '/';
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
        <Card style={{ width: '10 rem'}}>
          <div className="movie-view">
            <img className="movie-poster" src={movie.ImagePath} />
            <ListGroup varient="flush">
              <ListGroup.Item>
                <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              </ListGroup.Item>
              <ListGroup.Item>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              </ListGroup.Item>
              <ListGroup.Item>
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              </ListGroup.Item>
              <ListGroup.Item>
              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              </ListGroup.Item>
              <ListGroup.Item>
              <button className="back-to-main" onClick={this.goBack}>Back</button>
              </ListGroup.Item>
            </ListGroup>
          </div >
        </Card>
    );
  }
}
