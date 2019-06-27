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
import BackupIcon from '@material-ui/icons/Backup';

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
    <Link to="/debriefs">
      <ListItem button>
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Lista Debriefs" />
      </ListItem>
    </Link>
    <Link to="/aprovacao">
      <ListItem button>
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Aprovar debriefs" />
      </ListItem>
    </Link>
    <Link to="/pcm">
      <ListItem button>
        <ListItemIcon>
          <BackupIcon />
        </ListItemIcon>
        <ListItemText primary="PCM" />
      </ListItem>
    </Link>
    <Link to="/repair">
      <ListItem button>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="MCE & Repair" />
      </ListItem>
    </Link>
    <Link to="/turbineviewer">
      <ListItem button>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Turbine Viewer" />
      </ListItem>
    </Link>
  </div>
);
