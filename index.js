const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

//Movie data

let movies = [ {
    title : 'Head of State',
    director: 'Chris Rock',
    genre: 'Comedy',
    description: 'Chris Rock plays Mays Gilliam, a Washington, D.C. alderman who becomes the Democratic Party\'s longshot presidential candidate.'
},
{
    title : 'The Good, the Bad, and the Ugly',
    director: 'Sergio Leone',
    genre: 'Western',
    description: 'In 1862, during the American Civil War, a trio of bounty hunters race to find a chest of Confederate treasure.'
},
{
    title : 'Annie Hall',
    director: 'Woody Allen',
    genre: 'Comedy',
    description: 'The comedian Alvy Singer is trying to understand why his relationship with Annie Hall ended a year ago.'
},

{
    title : 'The Lives of Others',
    director: 'Florian Henckel von Donnersmarck',
    genre: 'Thriller',
    description: 'In 1984 East Germany, Stasi Hauptmann Gerd Wiesler (Ulrich Mühe), code name HGW XX/7, is ordered to spy on the playwright Georg Dreyman (Sebastian Koch), who has escaped state scrutiny due to his pro-Communist views and international recognition.'
},
{
    title : 'About Time',
    director: 'Richard Curtis',
    genre: 'Comedy',
    description: 'A recent university graduate from Cornwall discovers he can time travel.'
},
{
    title : 'Tommy Boy',
    director: 'Peter Segal',
    genre: 'Comedy',
    description: 'Tommy Callahan (Chris Farley) and Richard Hayden (David Spade) embark on a roadtrip to sell brakepads and protect the legacy of Tommy\'s recently departed father.'
},
{
    title : 'Four Weddings and a Funeral',
    director: 'Mike Newell',
    genre: 'Comedy',
    description: 'A group of friends laugh, love, and grieve over the course of a year in London.'
},
{
    title : 'Manhattan Murder Mystery',
    director: 'Woody Allen',
    genre: 'Mystery',
    description: 'A long-married couple gets caught in a madcap adventure when they suspect their neighbor may have murdered his wife.'
},
{
    title : 'Our Little Sister',
    director: 'Hirokazu Koreeda',
    genre: 'Drama',
    description: 'Three sisters who live in Kamakura agree to take care of their young half-sister after their father dies.'
},
{
    title : 'Howards End',
    director: 'James Ivory',
    genre: 'Drama',
    description: 'Howards End revolves around three families in England at the beginning of the 20th century: the Wilcoxes, rich capitalists with a fortune made in the colonies; the half-German Schlegel siblings (Margaret, Helen, and Tibby), whose cultural pursuits have much in common with the Bloomsbury Group; and the Basts, an impoverished young couple from a lower-class background.'
}
];

//Genre page data
let genres = [
  {name: 'Comedy', description: 'The main purpose of the comedy genre is to amuse the audience.'},
  {name: 'Western', description: 'Westerns tell stories primarily in the second half of the 19th century in the American Old West. The protagonists are often cowboys or gunfighers.'},
  {name: 'Thriller', description: 'Thrillers contain heightened feelings of suspense, excitement, surprise, anticipation, and anxiety.'},
  {name: 'Mystery', description: 'In this genre, detectives or other professionals solve crimes.'},
  {name: 'Drama', description: 'Films that are more serious than humorous in tone.'}
];

//Director page data
let directors = [
  {name:'Chris Rock', yob:'1965', yod:''},
  {name:'Sergio Leone', yob:'1929', yod:'1989'},
  {name:'Woody Allen', yob:'1935', yod:''},
  {name:'Florian Henckel von Donnersmarck', yob:'1973', yod:''},
  {name:'Richard Curtis', yob:'1956', yod:''},
  {name:'Peter Segal', yob:'1962', yod:''},
  {name:'Mike Newell', yob:'1942', yod:''},
  {name:'Hirokazu Koreeda', yob:'1962', yod:''},
  {name:'James Ivory', yob:'1921', yod:''},
];

//Example favorites

let favorites = [
  {
      title : 'The Good, the Bad, and the Ugly',
      director: 'Sergio Leone',
      genre: 'Western',
      description: 'In 1862, during the American Civil War, a trio of bounty hunters race to find a chest of Confederate treasure.'
  },
];

//Example users

let users = [
  {
  username: 'johnsmith',
  password: '12345',
  email: 'johnsmith@gmail.com',
  dob: '1/1/2001',
  favorites: ['Tommy Boy']
}
];


//Middleware functions

app.use(bodyParser.json());

app.use(morgan('common'));

app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error message');
});

//Returns a list of all movies

app.get("/movies", (req, res) => {
 res.json(movies);
});

//Returns data about a single movie

app.get("/movies/:title", (req, res) => {
  res.json(movies.find( (movie) =>
    {return movie.title.toLowerCase() === req.params.title}));
});

//Returns data about a genres

app.get("/genres/:name", (req, res) => {
  res.json(genres.find( (genre) =>
    {return genre.name.toLowerCase() === req.params.name}));
});

//Returns data about a director

app.get("/directors/:name", (req, res) => {
  res.json(directors.find( (director) =>
    {return director.name.toLowerCase() === req.params.name}));
});

//Allows new users to register

app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing username in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//Allows users to update their user info
app.put("/users/:username", (req, res) => {
  res.send("User information successfully updated.")
});


//Allows users to add a movie to their list of favorites

app.post("/users/:username/favorites", (req, res) => {
  let addFavorite = req.body;

  if (!addFavorite.title) {
    const message = "Missing movie title in request body";
    res.status(400).send(message);
  } else {
    addFavorite.id = uuid.v4();
    favorites.push(addFavorite);
    res.status(201).send(addFavorite);
  }
});

//Allows users to remove a movie from their list of favorites

app.delete("/users/:username/favorites/:title", (req, res) => {
    let user = users.find((user) => {
        return user.username === req.params.username
    })
    if (user) {
        let favorite = user.favorites.find((favorite) => {
            return favorite.toLowerCase() === req.params.title.toLowerCase()
        });
        if (favorite) {
            user.favorites = user.favorites.filter(function (obj) {
                return obj.toLowerCase() !== req.params.title.toLowerCase()
            });
            res.status(201).send(req.params.title + " was successfully removed from your favorites list.")
        } else {
            res.status(404).send("The movie " + req.params.title + " was not found.")
        }
    } else {
        // user not found
        res.status(404).send("User " + req.params.username + " was not found.")
    }
});

//Allows existing users to deregister

app.delete("/users/:username", (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username
  });
  if (user) {
    users.filter(function(obj) {
      return obj.username !== req.params.username
    });
    res.status(201).send(req.params.username + " no longer has an account.")
  }
});

//Listen for requests

app.listen(8080);
