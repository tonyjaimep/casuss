const mongoose = require('mongoose')

const shippingOptionSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true }
}, {
  timestamps: false
});

const ShippingOption = mongoose.model('ShippingOption', shippingOptionSchema);

module.exports = ShippingOption;
