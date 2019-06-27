// React
import React, { useState } from 'react';

// Material
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

// Style
import { menuList } from './titles';

const complexo_eolico = [
  { value: 'UDV', label: 'Uniao dos Ventos' },
  { value: 'V3', label: 'Ventos 3' },
  { value: 'CPFL', label: 'CPFL' },
  { value: 'ASABRANCA', label: 'Asa Branca' },
  { value: 'RIACHAO', label: 'Riachão' },
  { value: 'COPEL', label: 'COPEL' },
  { value: 'RDV', label: 'RDV' },
  { value: 'CHAPADAI', label: 'Chapada I' },
  { value: 'CHAPADAII', label: 'Chapada II&III' },
  { value: 'CALDEIRAO', label: 'Caldeirão' },
  { value: 'OMEGA2', label: 'Delta 2' },
  { value: 'OMEGA3', label: 'Delta 3' },
  { value: 'OMEGA5', label: 'Delta 5&6' },
  { value: 'AMONTADA', label: 'Amontada' },
  { value: 'TRAIRI', label: 'Trairi' },
  { value: 'ELETROSUL', label: 'Eletrosul' },
  { value: 'PONTAL', label: 'Pontal' },
  { value: 'SENANDES', label: 'Senandes' },
  { value: 'SANTABRIGIDA', label: 'Sta Brigida' },
  { value: 'SAOCLEMENTE', label: 'São Clemente' },
  { value: 'PEC', label: 'PEC' },
  { value: 'BW', label: 'Brazil Wind' },
  { value: 'BIOENERGY', label: 'Bio Energy' },
  { value: 'CAETITE', label: 'Caetite' },
  { value: 'UMBURANAS', label: 'Umburanas' },
  { value: 'BROTAS', label: 'Brotas' },
  { value: 'CAMPOLARGO', label: 'Campo Largo' },
  { value: 'CER', label: 'CER' },
  { value: 'TERRAFORM', label: 'Brookfield' },
  { value: 'TIANGUA', label: 'Tianguá' },
  { value: 'RENOVA', label: 'AES' },
  { value: 'LOMABLANCA', label: 'LOMABLANCA' }
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
    color: 'white',
  },
});

export default function TurbineHeader() {
  const classes = useStyles();
  const [windfarm, setWindfarm] = useState('UDV');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function abreListaWindfarms(event) { setAnchorEl(event.currentTarget); }
  function atualizaWindfarm(event, index) { setSelectedIndex(index); setAnchorEl(null); console.log(index) }
  function handleClose() { setAnchorEl(null); }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit"> E.L.A </Typography>

          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={abreListaWindfarms}> {windfarm} </Button>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
            {complexo_eolico.map((windfarm, index) => { return(<MenuItem onClick={event => atualizaWindfarm(event, index)} key={windfarm.value} selected={index === selectedIndex}> {windfarm.label} </MenuItem>)})}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
