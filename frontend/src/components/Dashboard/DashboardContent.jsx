import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import ATSScores from '../ATSScores';
import InterviewScheduling from '../InterviewScheduling';
import ResumeAndJD from '../ResumeAndJD';
import FinalLetters from '../FinalLetters';

function DashboardContent({ pathname }) {
  switch (pathname) {
    case '/dashboard':
      return <Typography>Welcome to the Dashboard</Typography>;
    case '/ats-scores':
      return <ATSScores />;
    case '/interview-scheduling':
      return <InterviewScheduling />;
    case '/resume-and-jd':
      return <ResumeAndJD />;
    case '/final-letters':
      return <FinalLetters />;
    default:
      return <Typography>Page not found</Typography>;
  }
}

DashboardContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DashboardContent;