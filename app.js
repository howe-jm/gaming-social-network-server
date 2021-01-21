require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const path = require('path');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
  })
);
app.use(helmet());
if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./passport')(passport);

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/posts', require('./routes/postsRoutes'));
app.use('/comments', require('./routes/commentsRoutes'));
app.use('/groups', require('./routes/groupsRoutes'));
app.use('/favorites', require('./routes/favoritesRoutes'));
app.use('/friends', require('./routes/friendsRoutes'));
app.use('/profiles', require('./routes/profilesRoutes'));

module.exports = app;
