const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Interviewed', 'Rejected', 'Hired'],
    default: 'Pending',
  },
  interviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interviewer',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);