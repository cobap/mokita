// React
import React from 'react';

// Create the list
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

// Router
import { Link } from 'react-router-dom';

// Export or menu list
export const menuList = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Criador de SR" />
      </ListItem>
    </Link>
    <Link to="/debrifar">
      <ListItem button>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Debrifar SR" />
      </ListItem>
    </Link>
    <Link to="/lista">
      <ListItem button>
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Ver lista de SR" />
      </ListItem>
    </Link>
  </div>
);
