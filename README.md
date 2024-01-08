# **Learning Node**

This is the repo i created and updated while learning Node. **-Shrikant Kalar**

## Notes

1. **Runtime Env** for running js code outside browser.

2. Node apps are **Single-Threaded**.

3. Ideal for **Disk, Network** access intensive app & Unideal for **CPU intensive** app. e.g. video encoding, img manipulation service

4. **Asynchronous (Non-Blocking):** A Single thread handles all requests. uses Event Queue

5. **Synchronous (Blocking):** A thread per request is used.

6. Similar to **window Obj** in browser we have **global Obj** in node, but **variables are not** attached to this global obj as they are attached to window in browser, they are only scoped within the file.

7. **Modules:** Every file in node is a module. **require()** is used to import modules. **module.exports** is used to export modules. By default es6 modules are not supported in node.

8. Node wraps every file in a **Module Wrapper Function** which is an **IIFE** (Immediately Invoked Function Expression) to create a scope for the file.

9. File System module has **Sync** & **Async** methods. Always use **Async** methods as they don't block the thread.

10. **Events** is a signal that something has happened in our app. **EventEmitter** is a class that emits events. **on()** is used to listen to events. **emit()** is used to emit events.

11. To raise an event we need to create a class that **extends** EventEmitter class and then emit the event.

12. Semantic versioning(SemVer): **MAJOR.MINOR.PATCH** e.g. 3.2.1
    ^ - same as 3.x.x (same major version)
    ~ - same as 3.2.x (same major & minor version)

13. **REST**: Representational State Transfer. Convention for building http services. CRUD operations.

14. **Route Parameters**: required values for backend. e.g. /api/course/1

15. **Query String** Params: optional data for backend. e.g. /api/courses/2023?sortBy=name

16. **404** - Not Found status code. Send when a requested resource doesn't exist on server.

17. When we **POST**, **PUT**, **DELETE** an object on server, we should return that object in the body of the response (with id) and perform input validation for post & put.

18. Input Validation: **Always** Validate input on server side as well as on client side. For js,ts use **joi**, **zod**.

19. **Middleware**: A fn that takes a _req_ object and either returns a _res_ to the client or passes control to another middleware fn. e.g. express.json()

20. **Configuration**: Handle configuration settings for diff envs using _config_ package.

21. **Debugging**: Use _debug_ package. _Shorter_, more _Organized_ & more _Controllable_ via name spaces.

22. **Templating Engines**: Used to send html along with data. _pug_, _mustache_, _ejs_ pkgs.

23. For every api endpoint we should have a separate file/module.

24. **Asynchronous** is differnt from **Concurrent** or **Multi-threaded**. We only have a single thread in node.

25. **Async Patterns** - Callbacks, Promises, Async/Await

26. **Promise** - holds the eventual result of an async operation. pending, resolved/fulfilled or rejected/error states.

27. Change Async fn that takes a **callback**, to return a **Promise**.

28. When **Rejecting** a promise, always pass an **Error** object.

29. **Promise.all()** - run multiple promises in parallel. not waiting for one to finish before starting another.

30. **Promise.race()** - when we want to do something as soon as one of the promises in the array resolves.

31. **Async/Await** - syntactic sugar over promises. **Await** can only be used inside an **Async** fn. Try, Catch block.

32. **Collection** in mongodb is similar to **Table**, **Document** is similar to **Row** in relational db.

33. **Mongoose** - ODM (Object Document Mapper) for mongodb. **Schema** defines the shape of documents in a collection. **Model** is a class made from Schema, used to create documents.

34. **Comparison Operators** - eq, ne, gt, gte, lt, lte, in, nin

35. **Logical Operators** - or, and, nor, not

36. **REGEX** - /pattern/flags

37. **Updating** - Query First(findbyId), Update First(findbyIdAndUpdate,updateOne,updateMany)

38. **Deleting** - deleteOne, deleteMany, findByIdAndDelete

39. DB level **Validation** is not possible in mongoDB. Use **Mongoose** for validation.

40. **Built-in Validators** - required, minlength, maxlength, match, enum,min,max.

41. No real **Relationships** like RDBs in mongoDB.

42. **Relationships in MongoDB** - Referencing (Normalization), Embedded Documents (Denormalization), Hybrid (Snapshot of data at a point in time).

43. **Referencing** - CONSISTENCY, but slower. **Embedding** - PERFORMANCE, but inconsistent.

44. **HYBRID** - Embed needed properties of a document & also add ref to that document.

45. We need to _think_ about the **Queries** we will be _running_ **ahead of time** and _design_ DB based on those queries.

46. **Embedded Documents** - most features available in Normal Documents are also available in Embedded Documents. BUT they can't be saved on their own.

47. **Transactions** - Ensures all operations succeed or none of them are applied to DB. They all succeed or rollback. They are **Atomic**.

48. **ObjectID** - 12 bytes, 1st 4 bytes - timestamp, next 3 bytes - machine identifier, next 2 bytes - process identifier, next 3 bytes - counter.

49. **mongoose.isObjectIdOrHexString()** - check if a string is a valid ObjectID.

50. **Joi-ObjectId** - custom joi validator for MongoDB ObjectID.

51. **Authentication** - process of determining whether a user is who they claim to be.

52. **Authorization** - process of determining if a user has permission to perform a given operation.

53. **joi-password-complexity** - custom joi validator for password complexity.

54. **Hashing** - process of converting input of any size into a fixed-size string. Used in hash tables for fast data retrieval & in cryptography for storing passwords.

55. **Salting** - adding random string to the password before hashing, making tha hash output unique. Used in conjunction with hashing to make it more secure.

56. **bcrypt** - use for hashing & salting passwords.

57. **JWT** - JSON Web Token. Long str identifying a user. Used for securely transmitting information between parties as a JSON object. Signed using a secret or public/private key pair. Has 3 parts - Header, Payload, Signature.

<!-- TODO: add whole auth process note -->

58. **Information Expert Principle** - an object that has enough info and is an expert in a given area, that obj should be responsible for making decisions and performing tasks related to that area.

59. **Arrow Fns** use when creating standalone fns. **Regular Fns** use when creating methods inside objects/class.

60. **401** - Unauthorized status code. Send when a user tries to access a protected resource without providing a valid JWT.

61. **403** - Forbidden status code. Send when a user tries to access a protected resource with a valid JWT but doesn't have permission to perform the operation.

62. **Express Error Middleware** - register it **after all the other** middlewares. 1st arg is err.

63. **express-async-errors** - use to handle async errors in express, instead of try catch block.

64. **Transport** - a storage device for your logs. used in Winston Logger.
