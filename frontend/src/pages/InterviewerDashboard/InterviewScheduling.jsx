import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import { interviewerApi } from '../../services/api';

export default function InterviewScheduling() {
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await interviewerApi.getProfile();
      setAvailability(response.data.availability);
    } catch (err) {
      setAlert({
        open: true,
        message: 'Failed to fetch schedule',
        severity: 'error'
      });
    }
  };

  const handleInputChange = (e) => {
    setNewSlot({ ...newSlot, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timeSlots = [{
        startTime: newSlot.startTime,
        endTime: newSlot.endTime
      }];
      
      await interviewerApi.updateSchedule({
        date: newSlot.date,
        timeSlots
      });
      
      setAlert({
        open: true,
        message: 'Schedule updated successfully',
        severity: 'success'
      });
      
      fetchAvailability();
      setNewSlot({ date: '', startTime: '', endTime: '' });
    } catch (err) {
      setAlert({
        open: true,
        message: 'Failed to update schedule',
        severity: 'error'
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Interview Scheduling</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <TextField
          name="date"
          label="Date"
          type="date"
          value={newSlot.date}
          onChange={handleInputChange}
          required
          InputLabelProps={{ shrink: true }}
          sx={{ mr: 1 }}
        />
        <TextField
          name="startTime"
          label="Start Time"
          type="time"
          value={newSlot.startTime}
          onChange={handleInputChange}
          required
          InputLabelProps={{ shrink: true }}
          sx={{ mr: 1 }}
        />
        <TextField
          name="endTime"
          label="End Time"
          type="time"
          value={newSlot.endTime}
          onChange={handleInputChange}
          required
          InputLabelProps={{ shrink: true }}
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained">Add Time Slot</Button>
      </Box>
      
      <List>
        {availability.map((slot, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={new Date(slot.date).toLocaleDateString()}
              secondary={slot.timeSlots.map((time, i) => (
                <span key={i}>
                  {time.startTime} - {time.endTime}
                  {time.isBooked ? ' (Booked)' : ' (Available)'}
                </span>
              ))}
            />
          </ListItem>
        ))}
      </List>

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