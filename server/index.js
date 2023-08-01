const express = require('express');
let app = express();
const getRepos = require('../helpers/github.js');
const insertRepos = require('../database/index.js');
const findTop = require('../database/index.js');
const bodyParser = require('body-parser')
// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('request for post from search:', req.body);
  var username = req.body.username;
  getRepos.getReposByUsername(username, ({data}) => {
    // data is an array of objects
    // console.log(data);
    data.forEach((repo) => {
      insertRepos.save(repo);
    });
    res.end();
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  findTop.find()
    .then((repos) => {
      console.log('sending these repos!', repos);
      res.send(repos);
    })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

