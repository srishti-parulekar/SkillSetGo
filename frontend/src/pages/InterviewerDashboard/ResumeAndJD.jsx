import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';
import { interviewerApi } from '../../services/api';

export default function ResumeAndJD() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await interviewerApi.getProfile();
      setApplications(response.data.assignedApplications);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleOpenApplication = async (applicationId) => {
    try {
      const response = await interviewerApi.getApplication(applicationId);
      setSelectedApplication(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Resume and Job Descriptions</Typography>
      <List>
        {applications.map((application) => (
          <ListItem
            button
            key={application._id}
            onClick={() => handleOpenApplication(application._id)}
          >
            <ListItemText
              primary={application.candidate.name}
              secondary={application.position.title}
            />
          </ListItem>
        ))}
      </List>

      <Dialog
        open={Boolean(selectedApplication)}
        onClose={() => setSelectedApplication(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              {selectedApplication.candidate.name} - {selectedApplication.position.title}
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>Resume</Typography>
              <Typography paragraph>{selectedApplication.resume}</Typography>
              
              <Typography variant="h6" gutterBottom>Job Description</Typography>
              <Typography paragraph>{selectedApplication.position.description}</Typography>
              
              <Typography variant="h6" gutterBottom>Requirements</Typography>
              <Typography paragraph>{selectedApplication.position.requirements}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedApplication(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}