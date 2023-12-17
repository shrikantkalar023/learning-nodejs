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
