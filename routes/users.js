const router = require('express').Router();
const passport = require('passport')

let User = require('../models/user.model');

router.route('/add').post((req, res) => {
	const { name, username, password } = req.body;

  const newUser = new User({ name, username, password: User.hashPassword(password) })

	newUser.save()
		.then(() => res.json(newUser))
		.catch(error => res.status(400).json('Error: ' + error))
})

module.exports = router;
