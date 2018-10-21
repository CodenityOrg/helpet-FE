const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

app = express();
app.use(history());

app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);