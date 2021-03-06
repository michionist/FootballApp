const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const jwt = require("express-jwt");
const csrf = require("csurf");


const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
  }
});

const validation = require("./middlewares/validations");

// Initialize Express app
const app = express();

// Global Variables
global.axios = require("axios");
global.moment = require("moment");

// ******* SET UP  MIDDLEWARE ********* //

// Parse Cookie from React App
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// parse application/json
app.use(bodyParser.json());

// Will handle text/plain requests
app.use(bodyParser.text());

// Setup CORS

var whitelist = [
  "http://localhost:6700",
  "https://football-app-react-frontend.herokuapp.com",
  "http://10dpredict.com",
  "https://10dpredict.com",
];

var corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(require("cors")(corsOptions));

// Setup the API
require("./api")(app, validation, csrfProtection);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Export app module
module.exports = app;