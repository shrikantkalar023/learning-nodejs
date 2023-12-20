const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, name: "shrikant" });
      // reject(new Error("Failed to get user from database"));
    }, 2000);
  });
};

const getRepos = (userName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reading repositories owned by ${userName} from github...`);
      // resolve(["repo1", "repo2", "repo3"]);
      reject(new Error("Failed to get repos from github"));
    }, 2000);
  });
};

const getCommits = (repo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reading commits in ${repo} from github...`);
      resolve(["commit1", "commit2", "commit3"]);
      // reject(new Error(`Failed to get commits from ${repo}`));
    }, 2000);
  });
};

console.log("Before");
// getUser(1, (user) => {
//   getRepos(user.name, (repos) => {
//     console.log(repos);
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });
getUser(1)
  .then((user) => getRepos(user.name))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log(commits))
  .catch((err) => console.log(err.message));
console.log("After");
