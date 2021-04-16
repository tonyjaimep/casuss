const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const crypto = require('crypto');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		unique: false,
		trim: true
	},
	password : {
		type: String,
		required: true,
		unique: false,
		trim: true
	}
}, {
	timestamps: true,
});

userSchema.statics.hashPassword = password => {
	return crypto.createHmac('sha256', process.env.APP_KEY)
		.update(password)
    .digest('hex');
};

userSchema.methods.validPassword = function (password) {
  const hash = userSchema.statics.hashPassword(password);

	return hash === this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
