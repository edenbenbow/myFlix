const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//Middleware functions

app.use(bodyParser.json());

app.use(morgan('common'));

app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error message');
  next()
});

//Returns a list of all movies

app.get("/movies", function(req, res) {

  Movies.find()
  .then(function(movies){
    res.status(201).json(movies);
  })
  .catch(function(error){
    console.error(error);
    res.status(500).send("Error" + err);
  });
});

//Returns data about a single movie

app.get("/movies/:Title",function(req, res){
  Movies.find({Title : req.params.Title})
  .then(function(movies){
    res.status(201).json(movies)
  })
  .catch(function(error){
    console.error(error);
    res.status(500).send("Error" + err);
  });
});

//Returns data about a genres

app.get("/movies/genres/:Name",function(req, res){
  Movies.findOne({'Genre.Name' : req.params.Name})
    .then(function(movie){
      res.status(201).send(movie.Genre.Name + '<br>' + movie.Genre.Description)
    })
    .catch(function(error){
      console.error(error);
      res.status(500).send("Error" + error);
    });
});

//Returns data about a director

app.get("/movies/directors/:Name",function(req, res) {
  Movies.findOne({"Director.Name" : req.params.Name})
  .then(function(movies){
    res.status(201).json(movies.Director)
  })
  .catch(function(error){
    console.error(error);
    res.status(500).send("Error" + error);
  });
});

//Get all users

app.get("/users", function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Allows new users to register

app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//Get a user by username

app.get("/users/:Username", function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Allows users to update their user info
app.put('/users/:Username', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, //{ $set :
  {
    Username : req.params.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }/*}*/,
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  })
});


//Allows users to add a movie to their list of favorites

app.post('/users/:Username/movies/:MovieId', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieId }
  },
  { new : true },
  function(error, updatedUser) {
    if (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    } else {
      res.json(updatedUser)
    }
  })
});

//Allows users to remove a movie from their list of favorites

app.delete("/users/:username/favorites/:MovieID", function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username}, {
    $pull : {MovieFavorites : req.params.MovieID}
  },
  {new: true},
  function(error, updatedUser) {
    if(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    } else {
      res.status(201).send("Movie ID #"+ req.params.MovieID + " is now removed from favorites.");
    }
  })
});

//Delete a user by username

app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Listen for requests

app.listen(8080);
