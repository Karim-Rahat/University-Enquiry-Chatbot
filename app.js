const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const redis = require("redis");
const router=require('./routes/routes')
const redisStore = require("connect-redis")(session);
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)
const app=express()
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config()

const { clearCache } = require("ejs");
const { json } = require("body-parser");
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',  'http://127.0.0.1:2000');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Credentials',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use(cookieParser());

const options = {
  host: process.env.DB_HOST,
  port: process.env.PORT,
  client: redisClient,
};

// session_store
//session_store
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    path: "/",
    key: "user_cookies",
    secret: "keyboard_cat",
    resave: false,
    store: new redisStore(options),
    saveUninitialized: true,
    cookie: { expires: 5000000000 * 50 },
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/Views");

app.use(express.static("public/"));
app.use(router)

var cors_set = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
};

app.use(cors(cors_set));



app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
