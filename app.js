const path = require("path");
const express = require('express');
const url = require("url");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
app.use((req, res, next) => {
    req.parts = url.parse(req.url, true);
    console.log(req.url);
    next();
});
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(router);
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
