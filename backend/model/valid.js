const mongoose = require('mongoose');

const validUSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  OTP: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m' 
  }
});

module.exports = mongoose.model('ValidU', validUSchema);
