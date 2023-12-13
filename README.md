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
