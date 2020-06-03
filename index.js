const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const allowedOrigins = [
  'http://localhost:1234',
  'https://watchrdb.herokuapp.com'
];

//Mongoose database connection

//mongoose.set('useFindAndModify', false);
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(
  'mongodb+srv://webapp:' + process.env.dbPassword + '@watchr-fg1rx.mongodb.net/Watchr?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);

//Middleware functions

app.use(bodyParser.json());

app.use(morgan('common'));
app.use(express.static('public'));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error: Something broke.');
  next()
});


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var message = 'The CORS policy for this application does not allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

const auth = require('./auth')(app);

//GET request

app.get('/', function (req, res) {
  var responseText = 'Welcome to Watchr. Enjoy!'
  res.send(responseText);
});


/**
 * Returns page showing all movies
 * endpoint URL: /movies
 * GET request
 * no required params
 * example request:
 * getMovies(token) {
 *      axios
 *         .get("https://watchrdb.herokuapp.com/movies", {
 *             headers: { Authorization: `Bearer ${token}` }
 *         })
 *         .then(response => {
 *             // Assign the result to the state
 *             this.props.setMovies(response.data);
 *         })
 *         .catch(function (error) {
 *             console.log(error);
 *         });
 *}
 * example response:
 * @param {string} title
 * @param {string} description
 * @param {string} image path
 * @param {object} genre
 */



app.get("/movies", passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error" + error);
    });
});

/**
 * Returns data about a single movie by title
 * endpoint URL: /movies/[title]
 * GET request
 * required params:
 * @param {string} title
 * example response:
 * @param {object} genre
 * @param {string} director
 * @param {string} title
 * @param {string} description
 * @param {string} image path
 */

app.get("/movies/:title", function (req, res) {
  Movies.findOne({ Title: req.params.Title })
    .then(function (movies) {
      res.status(201).json(movies)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error" + error);
    });
});


/**
 * Returns data about a genre by name
 * endpoint URL: /genres/[name]
 * GET request
 * required params:
 * @param {string} genre name
 * example response:
 * @param {string} title
 * @param {string} description
 */

app.get("/genres/:name", function (req, res) {
  Movies.findOne({ 'Genre.Name': req.params.Name })
    .then(function (movie) {
      res.status(201).send(movie.Genre.Name + '<br>' + movie.Genre.Description)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error" + error);
    });
});


/**
 * Returns data about a director
 * endpoint URL: /movies/directors/[name]
 * GET request
 * required params:
 * @param {string} name
 * example response:
 * @param {string} name
 * @param {string} bio
 * @param {date} date of birth
 */

app.get("/directors/:name", function (req, res) {
  movies.findOne({ "Director.Name": req.params.Name })
    .then(function (movies) {
      res.status(201).json(movies.director)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error" + error);
    });
});


/**
 * Gets all users
 * endpoint URL: /users
 * GET request
 * no required params
 * example request:
 * { "Username": "janeanderson",
 *  "Password": "12345",
 *  "Email": "janeanderson@gmail.com",
 *  "Birthday": "1/1/2001" }
 * example response:
 * @param {string} username
 * @param {string} password
 * @param {string} email address
 * @param {date} date of birth
 */

app.get("/users", passport.authenticate('jwt', { session: false }), function (req, res) {

  Users.find()
    .then(function (users) {
      res.status(201).json(users)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


/**
 * Allows new users to register
 * endpoint URL: /users/[UserID]
 * POST request
 * params required:
 * @params {string} username
 * @params {string} password
 * @params {string} email
 * @params {string} date of birth
 * example request:
 * { "Username": "johnsmith",
 *  "Password": "12345",
 *  "Email": "johnsmith@gmail.com",
 *  "Birthday": "1/1/2001" }
 * example response:
 * @param {string} confirmation message
 */



app.post('/users',
  [check('username', 'Username is required').isLength({ min: 5 }),
  check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('password', 'Password is required').not().isEmpty(),
  check('email', 'Email does not appear to be valid').isEmail()], (req, res) => {

    console.log("users req.body: " + JSON.stringify(req.body));
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    console.log(req.body.password);
    var hashedPassword = Users.hashPassword(req.body.password);
    Users.findOne({ Username: req.body.username })
      .then(function (user) {
        if (user) {
          return res.status(400).send(req.body.username + " already exists");
        } else {
          Users
            .create({
              Username: req.body.username,
              Password: hashedPassword,
              Email: req.body.email,
              Birthday: req.body.birthday
            })
            .then(function (user) { res.status(201).json(user) })
            .catch(function (error) {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      }).catch(function (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  });

/**
 * Gets a user by username
 * endpoint URL: /users/[username]
 * GET request
 * params required:
 * @params {string} username
 * example response:
 * @param {string} username
 * @param {string} password
 * @param {string} email address
 * @param {date} date of birth
 */


app.get("/users/:username", passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOne({ Username: req.params.username })
    .then(function (user) {
      res.json(user)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


/**
 * Allows users to update their user info
 * endpoint URL: /users/[username]
 * PUT request
 * params required:
 * @params {string} username
 * @params {string} password
 * @params {string} email
 * @params {string} date of birth
 */

app.put("/users/:username", passport.authenticate("jwt", { session: false }), [check('username', 'Username is required').isLength({ min: 5 }),
check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//check('password', 'Password is required').not().isEmpty(),
check('email', 'Email does not appear to be valid').isEmail()], (req, res) => {

  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let updateCommand = {
    $set: {
      Username: req.body.username,
      //Password: hashedPassword,
      Email: req.body.email,
      Birthday: req.body.birthday
    }
  };

  if (req.body.password) {
    let hashedPassword = Users.hashPassword(req.body.password);
    updateCommand.$set.Password = hashedPassword;
  }

  Users.findOneAndUpdate({
    Username: req.params.username
  },
    updateCommand,
    { new: true },
    function (error, updatedUser) {
      if (error) {
        console.error(error);
        res.status(500).send("Error " + error);
      } else {
        res.json(updatedUser);
      }
    })
});


/**
 * Allows users to add a movie to their list of favorites
 * endpoint URL: /users/username/favorites/movieID
 * POST request
 * no params required
 */

app.post('/users/:username/movies/:movieId', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndUpdate({
    Username: req.params.username
  }, {
    $push: { FavoriteMovies: req.params.movieId }
  },
    { new: true },
    function (error, updatedUser) {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedUser);
      }
    });
});


/**
 * Allows users to remove a movie from their list of favorites
 * endpoint URL: /users/username/favorites/movieID
 * DELETE request
 * no params required
 * example response:
 * @param {string} confirmation message
 */

app.delete("/users/:username/movies/:movieId", passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndUpdate({ Username: req.params.username }, {
    $pull: { FavoriteMovies: req.params.movieId }
  },
    { new: true },
    function (error, updatedUser) {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.status(201).send("Movie ID #" + req.params.MovieID + " is now removed from favorites.");
      }
    })
});


/**
 * Deletes a user by username
 * endpoint URL: /users/username
 * DELETE request
 * params required:
 * @param {string} username
 * example response:
 * @param {string} confirmation message
 */

app.delete('/users/:username', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndRemove({ Username: req.params.username })
    .then(function (user) {
      if (!user) {
        res.status(400).send(req.params.username + " was not found.");
      } else {
        res.status(200).send(req.params.username + " was deleted.");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Listen for requests

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port 3000");
});
