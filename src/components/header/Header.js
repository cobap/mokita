// React
import React, { Component } from 'react';

// Material
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// Style
import { menuList } from './titles';

// https://uigradients.com/#MoonlitAsteroid
const styles = {
  detailsText: {
    font: 10,
    fontSize: 10,
  },
  subtitle: {
    textSize: 15,
  },
};

const AppBarTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  glow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  root: {
    flexGrow: 1,
  },
  overrides: {
    // Name of the component react / style sheet
    MuiAppBar: {
      // Name of the rule
      root: {
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
        color: 'white',
      },
    },
  },
});

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
  { value: 'RENOVA', label: 'AES' }
];

class Header extends Component {
  state = {
    left: false,
    windfarm: 'UDV',
    anchorEscolhaParque: null,
    anchorStatusTurbinas: null,
  };

  toggleDrawer = (side, open) => () => { this.setState({ [side]: open, }); };

  handleMenuEscolhaParque = event => { this.setState({ anchorEscolhaParque: event.currentTarget }); };
  handleCloseEscolhaParque = () => { this.setState({ anchorEscolhaParque: null }); };

  handleMenuStatusTurbinas = event => { this.setState({ anchorStatusTurbinas: event.currentTarget }); };
  handleCloseStatusTurbinas = () => { this.setState({ anchorStatusTurbinas: null }); };

  render() {
    var handleMudancaWindfarm = this.props.handleMudancaWindfarm;
    // var handleMudancaStatus = this.props.handleMudancaStatus;

    const { classes } = this.props;
    const sideList = ( <div className={classes.list}> <List>{menuList}</List> </div> );
    const { anchorEscolhaParque, anchorStatusTurbinas } = this.state;
    const openMenuParques = Boolean(anchorEscolhaParque);
    const openStatusTurbinas = Boolean(anchorStatusTurbinas);

    return (
      <div>
        <MuiThemeProvider theme={AppBarTheme}>
          <AppBar position="static" style={{backgroundColor: '#0c1419'}} className={classes.appBar}>
            <Toolbar>

              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}> <MenuIcon /> </IconButton>
              <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div tabIndex={0} role="button" onClick={this.toggleDrawer('left', false)} onKeyDown={this.toggleDrawer('left', false)}> {sideList} </div>
              </Drawer>

              <Typography variant="h6" color="inherit" align="left" className={classes.grow}> {this.props.windfarm} </Typography>

              <div className={classes.menuAjustes} >
                <IconButton aria-owns={openMenuParques ? 'menu-appbar' : undefined} aria-haspopup="true" onClick={this.handleMenuEscolhaParque} color="inherit" >
                  <SearchIcon />
                </IconButton>
                <Menu id="menu-appbar" anchorEl={anchorEscolhaParque} anchorOrigin={{vertical: 'top', horizontal: 'right', }} transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={openMenuParques} onClose={() => { this.handleCloseEscolhaParque() }} >
                  {complexo_eolico.map(option => ( <MenuItem key={option.value} value={option.value} onClick={() => { this.handleCloseEscolhaParque(); handleMudancaWindfarm(option.value)}}> {option.label} </MenuItem> ))}
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
