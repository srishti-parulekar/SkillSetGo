import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import React from 'react';
function NavigationMenu({ menuItems }) {
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem button component={Link} to={`/${item.segment}`} key={item.segment}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
}

NavigationMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
};

export default NavigationMenu;