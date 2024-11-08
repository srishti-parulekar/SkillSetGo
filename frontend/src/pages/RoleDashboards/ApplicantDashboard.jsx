import React from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import MailIcon from '@mui/icons-material/Mail';

const applicantMenuItems = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'ats-scores', title: 'ATS Scores', icon: <AssessmentIcon /> },
  { segment: 'interview-scheduling', title: 'Interview Scheduling', icon: <CalendarTodayIcon /> },
  { segment: 'resume-and-jd', title: 'Resume & JD', icon: <DescriptionIcon /> },
  { segment: 'final-letters', title: 'Final Letters', icon: <MailIcon /> },
];

export default function ApplicantDashboard() {
  const session = {
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      image: 'https://example.com/avatar.jpg',
    },
  };

  return <DashboardLayout menuItems={applicantMenuItems} session={session} />;
}