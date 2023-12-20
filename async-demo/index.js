console.log("Before");

// schedules a task to be performed in the future.
setTimeout(() => {
  console.log("Reading a user from a database...");
}, 2000);
console.log("After");
