const router = require('express').Router();

const ShippingOption = require('../models/shippingOption.model');

router.route('/')
  .get((req, res) => {
    ShippingOption.find()
      .then(results => res.json(results))
      .catch(err => res.status(400).json('Error: ' + error))
  })
  .post((req, res) => {
    const newOption = new ShippingOption({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    })

    newOption.save()
      .then(option => res.json(option))
      .catch(err => res.status(400).json('Error: ' + error))
  });

router.route('/:id')
  .post((req, res) => {
    ShippingOption.findById(req.params.id)
      .then(option => {
        option.name = req.body.name;
        option.price = req.body.price;
        option.description = req.body.description;
        option.save()
          .then(saved => res.json(saved));
      })
      .catch(err => res.status(400).json('Error: ' + error))
  })
  .delete((req, res) => {
    ShippingOption.findByIdAndDelete(req.params.id)
      .then(() => res.json('Shipping option deleted.'))
      .catch(err => res.status(400).json('Error: ' + error))
  });

module.exports = router;
