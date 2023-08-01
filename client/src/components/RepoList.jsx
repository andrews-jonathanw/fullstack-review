import React from 'react';


var handleClick = (e) => {
  const url = e.target.getAttribute('url');
  window.open(url);
}


const RepoList = ({repos}) => {
  if ({repos}.repos.data === undefined) {
    return (
      <div>
        <h4> Repository List </h4>
        There are {repos.length} repos.
        </div>
    )
  } else {
    var repos = {repos}.repos.data;
    //console.log(repos);
    return (
      <div>
        <h4> Repository List </h4>
        Displaying {repos.length} of the top repos in our database.
        <ol>
        {repos.map((repo, index) => {
          return (
            <div key={index} id='repo'>
              <li id='repo-name' url={repo.repo_url} onClick={(e) => {
              handleClick(e);
            }} >Repo Name: {repo.repo_name}</li>
              <ul>
                <li>Forks: {repo.repo_forks}</li>
                <li>Username: {repo.repo_owner_name}</li>
              </ul>
          </div>
          )
          })}
          </ol>
      </div>
    )
  }

};

export default RepoList;