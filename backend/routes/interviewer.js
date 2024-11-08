const express = require('express');
const router = express.Router();
const Interviewer = require('../models/Interviewer');
const Application = require('../models/Application');
const auth = require('../routes/auth');

// Get interviewer profile
router.get('/profile', auth, async (req, res) => {
  try {
    const interviewer = await Interviewer.findOne({ user: req.user.id })
      .populate('user', ['name', 'email'])
      .populate('assignedApplications');
    
    if (!interviewer) {
      return res.status(404).json({ msg: 'Interviewer profile not found' });
    }
    
    res.json(interviewer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get ATS scores for assigned applications
router.get('/ats-scores', auth, async (req, res) => {
  try {
    const interviewer = await Interviewer.findOne({ user: req.user.id });
    const applications = await Application.find({
      '_id': { $in: interviewer.assignedApplications }
    }).select('candidate position atsScore');
    
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update interview schedule
router.post('/schedule', auth, async (req, res) => {
  try {
    const { date, timeSlots } = req.body;
    const interviewer = await Interviewer.findOne({ user: req.user.id });
    
    interviewer.availability.push({ date, timeSlots });
    await interviewer.save();
    
    res.json(interviewer.availability);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Submit interview feedback
router.post('/feedback/:applicationId', auth, async (req, res) => {
  try {
    const { score, feedback } = req.body;
    const interviewer = await Interviewer.findOne({ user: req.user.id });
    
    interviewer.completedInterviews.push({
      application: req.params.applicationId,
      score,
      feedback
    });
    
    // Update application status
    await Application.findByIdAndUpdate(req.params.applicationId, {
      $set: { interviewScore: score, interviewFeedback: feedback }
    });
    
    await interviewer.save();
    res.json(interviewer.completedInterviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get resumes and JDs
router.get('/applications/:applicationId', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId)
      .populate('position', ['title', 'description', 'requirements']);
    
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }
    
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;