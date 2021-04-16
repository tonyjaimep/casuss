const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const router = require('express').Router();

const User = require('../models/user.model');

const authenticated = require('../middleware/authenticated')

passport.use(new LocalStrategy(
	(username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err) { return done(err); }

      if (!user) { return done(null, false, { message: "No user found" }); }

      if (!user.validPassword(password)) { return done(null, false, { message: "Wrong password" }) }

      return done(null, user);
		});
	}
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, {
      name: user.name,
      username: user.username,
    });
  });
});

router.route('/login').post(
  passport.authenticate('local'),
  (req, res) => {
    res.redirect('/auth/user');
  }
);

router.route('/user').get(
  authenticated,
  (req, res) => {
    res.json(req.user);
  }
);

router.route('/logout').get((req, res) => {
  req.logout();
  res.end();
});

module.exports = router;
