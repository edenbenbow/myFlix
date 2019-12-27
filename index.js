const express = require('express');
  morgan = require('morgan');

const app = express();

let topMovies= [ {
    title : 'Head of State',
},
{
    title : 'The Good, the Bad, and the Ugly',
},
{
    title : 'Annie Hall',
},

{
    title : 'The Lives of Others',
},
{
    title : 'About Time',
},
{
    title : 'Tommy Boy',
},
{
    title : 'Four Weddings and a Funeral',
},
{
    title : 'Manhattan Murder Mystery',
},
{
    title : 'Our Little Sister',
},
{
    title : 'Howards End',
}
]

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('Welcome to Watchr!')
});

app.get('/movies', function(req, res) {
  res.json(topMovies)
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error message');
});

app.listen(8080);
