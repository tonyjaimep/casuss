const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
	title: { type: String, required: true },
	isbn: { type: String, required: true },
	author: { type: String, required: false },
	description: { type: String, required: false },
	stock: { type: Number, required: true, default: 0 },
	unitPrice: { type: Number, required: true, default: 0 },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
