const mongoose = require('mongoose');

const interviewerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  availability: [{
    date: Date,
    timeSlots: [{
      startTime: String,
      endTime: String,
      isBooked: {
        type: Boolean,
        default: false
      }
    }]
  }],
  assignedApplications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  completedInterviews: [{
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    },
    score: Number,
    feedback: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Interviewer', interviewerSchema);