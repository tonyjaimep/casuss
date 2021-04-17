const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    quantity: {
      type: Number
    }
  }],
  fragmented: Boolean,
  shippingOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingOption',
    required: false
  },
  status: { type: String, required: true, default: "Orden pendiente" },
  total: { type: Number, required: true }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
