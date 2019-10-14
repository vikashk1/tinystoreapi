# Tiny Store

## Start

- You can change configuration in `config.js` file.
- Run following command

    ```sh
    npm install
    npm start
    ```

- Node.js server will start on 3000 port

## APIs

- Get an incomplete haiku

    ```js
    curl -i -XGET '/list?q=Samsung+OR+apple&limit=10&skip=0&orderby=popularity&order=desc'
    ```

- Reset data

    ```js
    curl -i -XGET '/resetData'
    ```
