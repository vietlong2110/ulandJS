const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) { //prevent CORS
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, Authorization, X-Requested-With');
	next();
});

// const test = require('./test/main.js');
// app.use('/test', test);

const api = require('./api.js');
app.use('/api', api);

if (app.get("env") !== "production") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message + "[DEV]",
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {}
    });
});

const port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log('App is running on port ' + port);
});
