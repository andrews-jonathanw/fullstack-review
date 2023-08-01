import React from 'react';

const RepoList = ({repos}) => {
  if ({repos}.repos.data === undefined) {
    return (
      <div>
        <h4> Repo List Component </h4>
        There are {repos.length} repos.
        </div>
    )
  } else {
    var repos = {repos}.repos.data;
    console.log(repos);
    return (
      <div>
        <h4> Repo List Component </h4>
        There are {repos.length} repos.
        {repos.map((repo, index) => {
          return (
            <div key={index} id='repo'>
            Repo Name: {repo.repo_name} Forks: {repo.repo_forks}
          </div>
          )
          })}
      </div>
    )
  }

};

export default RepoList;