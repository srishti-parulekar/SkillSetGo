import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout as ToolpadDashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import { useDemoRouter } from '@toolpad/core/internal';
import NavigationMenu from './NavigationMenu';
import DashboardContent from './DashboardContent';

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

function DashboardLayout({ menuItems, session }) {
  const router = useDemoRouter('/dashboard');

  return (
    <AppProvider
      session={session}
      theme={demoTheme}
      router={router}
      navigation={menuItems}
    >
      <ToolpadDashboardLayout>
        <NavigationMenu menuItems={menuItems} />
        <Box sx={{ py: 4, px: 3 }}>
          <DashboardContent pathname={router.pathname} />
        </Box>
      </ToolpadDashboardLayout>
    </AppProvider>
  );
}

DashboardLayout.propTypes = {
  menuItems: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
};

export default DashboardLayout;