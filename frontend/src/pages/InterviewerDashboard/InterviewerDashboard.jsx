import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import MailIcon from '@mui/icons-material/Mail';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

import ATSScores from './ATSScores';
import InterviewScheduling from './InterviewScheduling';
import ResumeAndJD from './ResumeAndJD';
import FinalLetters from './FinalLetters';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'ats-scores',
    title: 'ATS Scores',
    icon: <AssessmentIcon />,
  },
  {
    segment: 'interview-scheduling',
    title: 'Interview Scheduling',
    icon: <CalendarTodayIcon />,
  },
  {
    segment: 'resume-and-jd',
    title: 'Resume & JD',
    icon: <DescriptionIcon />,
  },
  {
    segment: 'final-letters',
    title: 'Final Letters',
    icon: <MailIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  switch (pathname) {
    case '/dashboard':
      return <Typography>Welcome to the Interviewer Dashboard</Typography>;
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

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default function InterviewerDashboard(props) {
  const { window } = props;

  const [session, setSession] = React.useState({
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      image: 'https://example.com/avatar.jpg',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            image: 'https://example.com/avatar.jpg',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Box sx={{ py: 4, px: 3 }}>
          <DemoPageContent pathname={router.pathname} />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

InterviewerDashboard.propTypes = {
  window: PropTypes.func,
};