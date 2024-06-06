To set up a Node.js Express server using TypeScript, do the following:

1. Create the backend folder
2. Run `npm i -y`
3. Run `npm i express @types/express`
4. Create a `server.ts` file in the folder
5. Inside your `server.ts` file, set up the boilerplate Express server code:
```javascript
    import express from "express";

    const app = express();
    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}!`);
    });
```
6. Run the following command `npm i --save-dev nodemon ts-node`
7. Go to the `package.json` and where it says:
    ```json
    "scripts": {
        "test": ""
    }
    ```
    Replace it with:
    ```json
    "scripts": {
        "dev": "nodemon server.ts" // <-- make sure to change the server file name if you named it something else
    }
    ```
8. Finally, run `npm run dev`