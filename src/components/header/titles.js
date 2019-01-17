// React
import React from 'react';

// Create the list
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import TodayIcon from '@material-ui/icons/Today';
import BuildIcon from '@material-ui/icons/Build';
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
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Metricas" />
      </ListItem>
    </Link>
    <Link to="/tarefas">
      <ListItem button>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Tarefas" />
      </ListItem>
    </Link>
    <Link to="/calendario">
      <ListItem button>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Planejamento" />
      </ListItem>
    </Link>
    <Link to="/checklists">
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Checklists" />
      </ListItem>
    </Link>
    <Link to="/ajustes">
      <ListItem button>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Ajustes" />
      </ListItem>
    </Link>
  </div>
);
