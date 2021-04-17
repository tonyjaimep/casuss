const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();

// app definition
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.APP_KEY,
  cookie: { secure: false, maxAge: null },
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

const connection = mongoose.connection;

connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
})

// routing
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
// const vendorsRouter = require('./routes/vendors');
const authRouter = require('./routes/auth');

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
// app.use('/vendors', vendorsRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
