import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid2, Card, CardContent, CardHeader, ListItemIcon, ListItemText, Box, Drawer, IconButton, useMediaQuery, useTheme, Fade, TextField } from '@mui/material';
import { SmartToy, Chat, Assessment, Timeline, Security, Speed, Menu as MenuIcon, Close as CloseIcon, Notifications } from '@mui/icons-material';
import './Home.css';

export default function SkillSetGoFunLanding() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    { title: 'AI-Powered Matching', icon: <SmartToy />, description: 'Our advanced AI algorithms ensure perfect candidate-job matches.' },
    { title: 'Smart Resume Parsing', icon: <Assessment />, description: 'Automatically extract and analyze key information from resumes.' },
    { title: 'Intelligent Chatbots', icon: <Chat />, description: 'AI-driven chatbots for efficient candidate communication and support.' },
    { title: 'Comprehensive Analytics', icon: <Timeline />, description: 'In-depth insights and reports for data-driven hiring decisions.' },
    { title: 'Secure Data Handling', icon: <Security />, description: 'Top-notch security measures to protect sensitive information.' },
    { title: 'Lightning-Fast Performance', icon: <Speed />, description: 'Optimized for speed, ensuring a smooth user experience.' },
  ];

  const aiFeatures = [
    { title: 'Advanced Candidate Matching', icon: <SmartToy />, description: 'AI algorithms match candidates to job descriptions with unparalleled accuracy.' },
    { title: 'Intelligent Resume Parsing', icon: <Assessment />, description: 'Extract and analyze key information from resumes in various formats.' },
    { title: 'Natural Language Processing', icon: <Chat />, description: 'Understand and process human language for improved communication and analysis.' },
    { title: 'Predictive Analytics', icon: <Timeline />, description: 'Forecast hiring trends and make data-driven decisions.' },
    { title: 'Automated Screening', icon: <Security />, description: 'Efficiently screen candidates based on predefined criteria.' },
    { title: 'Sentiment Analysis', icon: <SmartToy />, description: 'Analyze candidate responses and feedback for deeper insights.' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const menuItems = ['Login'];

  const handleMenuClick = () => {
    navigate('/login');
  };

  const drawer = (
    <Box className="drawer" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box className="drawer-header">
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <ListItemIcon>
        <ListItemText primary="Login" onClick={handleMenuClick} />
      </ListItemIcon>
    </Box>
  );

  return (
    <div className="fun-background">
      <Box className="app-container">
        <AppBar className="app-bar">
          <Toolbar>
            <Typography variant="h6" component="div" className="app-title">
              SkillSetGo
            </Typography>
            {isMobile ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Button color="inherit" onClick={handleMenuClick}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>

        <section className="hero-section">
          <Container maxWidth="xl">
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#333' }}>
              Welcome to SkillSetGo
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333' }}>
              The Next-Gen Applicant Tracking System Powered by AI
            </Typography>
            <Button variant="contained" color="secondary" size="large" className="cta-button">
              Get Started
            </Button>
          </Container>
        </section>

        <Container maxWidth="xl" className="features-section">
          <Typography variant="h3" component="h2" align="center" className="section-title">
            Key Features
          </Typography>
          <Grid2 container spacing={4}>
            {features.map((feature, index) => (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Fade in={true} timeout={500 * (index + 1)}>
                  <Card className="feature-card">
                    <CardHeader
                      avatar={<Box className="feature-icon">{feature.icon}</Box>}
                      title={feature.title}
                      titleTypographyProps={{ variant: 'h6', align: 'center' }}
                    />
                    <CardContent>
                      <Typography variant="body2" align="center">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid2>
            ))}
          </Grid2>
        </Container>

        <Container maxWidth="xl" className="ai-section">
          <Typography variant="h3" component="h2" align="center" className="section-title">
            AI Capabilities
          </Typography>
          <Grid2 container spacing={4}>
            {aiFeatures.map((feature, index) => (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Fade in={true} timeout={500 * (index + 1)}>
                  <Card className="feature-card">
                    <CardHeader
                      avatar={<Box className="ai-feature-icon">{feature.icon}</Box>}
                      title={feature.title}
                      titleTypographyProps={{ variant: 'h6', align: 'center' }}
                    />
                    <CardContent>
                      <Typography variant="body2" align="center">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid2>
            ))}
          </Grid2>
        </Container>

        <Box component="footer" className="footer">
          <Container maxWidth="lg">
            <Typography variant="h6" gutterBottom align="center">
              Stay Updated
            </Typography>
            <Typography variant="body2" paragraph align="center">
              Subscribe to our newsletter for the latest updates and features.
            </Typography>
            <Box className="subscribe-form">
              <TextField variant="outlined" placeholder="Your email" size="small" className="subscribe-input" />
              <Button variant="contained" color="primary" startIcon={<Notifications />}>
                Subscribe
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </div>
  );
}