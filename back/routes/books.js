const router = require('express').Router()

const Book = require('../models/book.model')

router.route('/')
	.get((req, res) => {
		Book.find()
			.then(books => res.json(books))
			.catch(err => res.status(400).json('Error: ' + err));
	})
	.post((req, res) => {
		const { title, isbn, author, description, stock, unitPrice } = req.body;

		const newBook = new Book({ title, isbn, author, description, stock, unitPrice });

		newBook.save()
			.then(() => res.json(newBook))
			.catch(err => res.status(400).json('Error: ' + err))
	});

router.route('/:id')
	.get((req, res) => {
		Book.findById(req.params.id)
			.then(book => res.json(book))
			.catch(err => res.status(400).json('Error: ' + err))
	})
	.delete((req, res) => {
		Book.findByIdAndDelete(req.params.id)
			.then(() => res.json('Book deleted.'))
			.catch(err => res.status(400).json('Error: ' + err));
	})
	.post((req, res) => {
		Book.findById(req.params.id)
			.then(book => {
				book.title = req.body.title;
				book.isbn = req.body.isbn;
				book.author = req.body.author;
				book.description = req.body.description;
				book.stock = req.body.stock;
				book.unitPrice = req.body.unitPrice;
        book.save()
          .then(() => res.json(book));
			})
			.catch(err => res.status(400).json('Error: ' + err))
	});

module.exports = router
