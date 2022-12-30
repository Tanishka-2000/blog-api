const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


require('dotenv').config()

// connection to database 
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODBURL)
  .catch(err => {
  console.log('mongodb connection error');
  console.log(err);
});

// config passport
const passport = require("passport");
const jwtStrategry  = require("./strategies/jwt")
passport.use(jwtStrategry);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const apiRouter = require('./api/index.js');
const adminApiRouter = require('./api/admin.js');

app.use('/api', apiRouter);
app.use('/api/admin', passport.authenticate('jwt', { session: false }), adminApiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('app listening on port '+ PORT));