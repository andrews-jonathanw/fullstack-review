const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
mongoose.connect(`${process.env.MONGODB_CONNECT_URI}`, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose Database connected!');
  })
  .catch(err => {
    console.log(err);
  });

  // doesnt fix parse timout error
  // mongoose.Promise = global.Promise;

let repoSchema = mongoose.Schema({
  repo_id : Number,
  repo_name : String, // name of repo
  repo_owner_name: String, // string of username (owner of repo)
  repo_forks: Number,
  repo_url : {type: String, unique: true},
});
let Repo = mongoose.model('Repo', repoSchema);


let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //console.log('this is the repo',repo);
  var newRepo = new Repo({
    repo_id: repo.id,
    repo_name: repo.name,
    repo_owner_name: repo.owner,
    repo_forks: repo.forks,
    repo_url: repo.url
  }).save((err, data) => {
    console.log(data);
    if (err) {
      console.log('Throwing error: ', err);
    } else {
      console.log('Document inserted successfully!')
    }
  });
}

let find = () => {
  return Repo.find().sort({repo_forks: -1, id: 1}).limit(25);
}
module.exports.save = save;
module.exports.find = find;