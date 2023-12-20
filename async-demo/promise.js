const p = new Promise((resolve, reject) => {
  // some Async work
  setTimeout(() => {
    resolve("success");
    // reject(new Error("Error message"));
  }, 1000);
});

p.then((result) => console.log(result)).catch((err) =>
  console.log(err.message)
);
