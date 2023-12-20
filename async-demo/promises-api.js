const resolvedPromise = Promise.resolve({ id: 1 });
resolvedPromise.then((result) => console.log(result));

// Error obj includes error call stack
const rejectedPromise = Promise.reject(new Error("Rejection Reason"));
rejectedPromise.catch((err) => console.log(err));
