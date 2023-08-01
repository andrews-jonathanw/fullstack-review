const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  //console.log('inside getRepos....username is:', username);
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(options.url, {headers: options.headers})
   .then((res) => {
    data = res.data.map(repo => {
      let data = {id: repo.id, name: repo.name, owner: repo.owner.login, forks: repo.forks, url: repo['html_url']};
      return data;
    })
      // console.log({data});
      cb({data})
      console.log('Github succesfully fetched');
   })
   .catch(err => {
    throw err;
   });
  }

module.exports.getReposByUsername = getReposByUsername;