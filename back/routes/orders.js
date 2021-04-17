const router = require('express').Router();

const authenticated = require('../middleware/authenticated');

const Order = require('../models/order.model');
const Book = require('../models/book.model');

router.route('/')
  .get(
    authenticated,
    (req, res) => {
      Order.find({ user: req.user._id })
        .populate('shippingOption')
        .populate('books.book')
        .exec()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err))
    }
  ).post(
    authenticated,
    (req, res) => {
      // TODO: fragment orders

      var total = 0;

      async function computeTotal() {
        await req.body.books.forEach(b => {
          Book
            .findById(b.book)
            .then(book => {
              total += book.unitPrice * b.quantity
            });
        });

        await ShippingOption.findById(req.body.shippingOption)
          .then(opt => { total += opt.price })
      }

      computeTotal().finally(() => {
        const newOrder = new Order({
          user: req.user._id,
          books: req.body.books,
          shippingOption: req.body.shippingOption ? req.body.shippingOption : null,
          fragmented: false,
          status: 'Orden pendiente',
          total
        });

        newOrder.save()
          .then(order => { res.json(newOrder) })
          .catch(err => { res.status(400).json('Error: ' + err) });
      });
    }
  );

router.route('/all')
  .get(
    authenticated,
    (req, res) => {
      Order.find()
        .populate('books.book')
        .populate('user')
        .populate('shippingOption')
        .exec()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err))
    }
  );

router.route('/:id').post((req, res) => {
  Order.findById(req.params.id)
    .populate('user')
    .populate('shippingOption')
    .populate('books.book')
    .then(order => {
      order.status = req.body.status;
      order.save()
        .then(savedOrder => res.json(savedOrder));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
