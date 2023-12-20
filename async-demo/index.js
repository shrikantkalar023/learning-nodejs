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

console.log("Before");
getUser(1, (user) => {
  console.log(user);
  getRepos(user.name, (repos) => console.log(repos));
});
console.log("After");
