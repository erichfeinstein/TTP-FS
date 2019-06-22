const body = require('body-parser');
const path = require('path');
const passport = require('passport');
const db = require('./db');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

// parse application/x-www-form-urlencoded
app.use(body.urlencoded({ extended: false }));

// parse application/json
app.use(body.json());

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

const PORT = 8080;
app.listen(PORT, function() {
  console.log('listening on port', PORT);
});
