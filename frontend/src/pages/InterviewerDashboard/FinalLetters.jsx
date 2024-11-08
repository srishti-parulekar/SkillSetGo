import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { interviewerApi } from '../../services/api';

export default function FinalLetters() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState({ score: '', comments: '' });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await interviewerApi.getProfile();
      setApplications(response.data.assignedApplications.filter(app => !app.interviewScore));
    } catch (err) {
      setAlert({
        open: true,
        message: 'Failed to fetch applications',
        severity: 'error'
      });
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      await interviewerApi.submitFeedback(selectedApplication._id, {
        score: parseInt(feedback.score),
        feedback: feedback.comments
      });
      
      setAlert({
        open: true,
        message: 'Feedback submitted successfully',
        severity: 'success'
      });
      
      setSelectedApplication(null);
      setFeedback({ score: '', comments: '' });
      fetchApplications();
    } catch (err) {
      setAlert({
        open: true,
        message: 'Failed to submit feedback',
        severity: 'error'
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Final Letters</Typography>
      <List>
        {applications.map((application) => (
          <ListItem key={application._id}>
            <ListItemText
              primary={application.candidate.name}
              secondary={application.position.title}
            />
            <Button
              variant="contained"
              onClick={() => setSelectedApplication(application)}
            >
              Submit Feedback
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={Boolean(selectedApplication)}
        onClose={() => setSelectedApplication(null)}
      >
        <DialogTitle>Submit Interview Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Interview Score (0-100)"
            type="number"
            fullWidth
            value={feedback.score}
            onChange={(e) => setFeedback({ ...feedback, score: e.target.value })}
            inputProps={{ min: 0, max: 100 }}
          />
          <TextField
            margin="dense"
            label="Feedback Comments"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedback.comments}
            onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedApplication(null)}>Cancel</Button>
          <Button onClick={handleSubmitFeedback} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}