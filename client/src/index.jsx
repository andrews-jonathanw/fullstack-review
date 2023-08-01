import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';


const App = () => {

  const [repos, setRepos] = useState([]);
  useEffect(() => {
    // Update the document
    getUserRepos();

  }, []);

  const search = (term) => {
    console.log('search button pressed!!!', `${term} was searched`);

    axios.post('/repos' , {username: term})
      .then((res) => {
        //console.log('response ', res);
        return getUserRepos();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getUserRepos = () => {
    //console.log('inside getUserRepos')
    return axios.get('/repos')
      .then(({data}) => {
        //console.log({data});
        setRepos({data});
      });
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));