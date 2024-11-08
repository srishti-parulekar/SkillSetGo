import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const interviewerApi = {
  getProfile: () => api.get('/interviewer/profile'),
  getATSScores: () => api.get('/interviewer/ats-scores'),
  updateSchedule: (scheduleData) => api.post('/interviewer/schedule', scheduleData),
  submitFeedback: (applicationId, feedbackData) => 
    api.post(`/interviewer/feedback/${applicationId}`, feedbackData),
  getApplication: (applicationId) => 
    api.get(`/interviewer/applications/${applicationId}`)
};

export default api;