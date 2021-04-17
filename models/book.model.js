const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: { type: String, required: true },
	isbn: { type: String, required: true },
	author: { type: String, required: false },
	description: { type: String, required: false },
	stock: { type: Number, required: true, default: 0 },
	unitPrice: { type: Number, required: true, default: 0 },
});

bookSchema.plugin(mongoose_fuzzy_searching, {
  fields: ['title', 'isbn', 'author', 'description']
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
