const getUser = (id, callback) => {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, name: "shrikant" });
  }, 2000);
};

const getRepos = (userName, callback) => {
  setTimeout(() => {
    console.log(`Reading repositories owned by ${userName} from github...`);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
};

// Asyncronous
console.log("Before");
getUser(1, (user) => {
  getRepos(user.name, (repos) => {
    console.log(repos);
    getCommits(repos[0], (commits) => {
      console.log(commits);
      // Callback Hell
      // Nested Callbacks
      // Christmas tree problem
    });
  });
});
console.log("After");

// Syncronous
console.log("Before");
const user = getUser(1);
const repos = getRepos(user.name);
const commits = getCommits(repos[0]);
console.log("After");
