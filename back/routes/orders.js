const router = require('express').Router();

const authenticated = require('../middleware/authenticated');

const Order = require('../models/order.model');
const Book = require('../models/book.model');

router.route('/').post(
  authenticated,
  (req, res) => {
    // TODO: fragment orders

    let total = 0;

    req.body.books.forEach(b => {
      Book
        .findById(b.book)
        .then(book => {
          total += book.unitPrice * b.quantity
        });
    });

    const newOrder = new Order({
      user: req.user.id,
      books: req.body.books,
      fragmented: false,
      status: 'Orden pendiente',
      total
    });

    newOrder.save()
      .then(order => { res.json(newOrder) })
      .catch(err => { res.status(400).json('Error: ' + err) });
  }
);

module.exports = router;
