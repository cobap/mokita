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
  { value: 'Asa Branca', label: 'Asa Branca' },
  { value: 'Riachão', label: 'Riachão' },
  { value: 'COPEL', label: 'COPEL' },
  { value: 'RDV', label: 'RDV' },
  { value: 'Miassaba', label: 'Miassaba' },
  { value: 'Chapada I', label: 'Chapada I' },
  { value: 'Chapada II&III', label: 'Chapada II&III' },
  { value: 'Caldeirão', label: 'Caldeirão' },
  { value: 'Delta 2', label: 'Delta 2' },
  { value: 'Delta 3', label: 'Delta 3' },
  { value: 'AMONTADA', label: 'Amontada' },
  { value: 'Trairi', label: 'Trairi' },
  { value: 'Eletrosul', label: 'Eletrosul' },
  { value: 'Pontal', label: 'Pontal' },
  { value: 'Senandes', label: 'Senandes' },
  { value: 'Sta Brigida', label: 'Sta Brigida' },
  { value: 'São Clemente', label: 'São Clemente' },
  { value: 'PEC', label: 'PEC' },
  { value: 'PEC Expansão', label: 'PEC Expansão' },
  { value: 'Brazil Wind', label: 'Brazil Wind' },
  { value: 'Rio Energy', label: 'Rio Energy' },
  { value: 'Brotas', label: 'Brotas' },
  { value: 'Campo Largo', label: 'Campo Largo' },
  { value: 'CER', label: 'CER' },
  { value: 'Brookfield', label: 'Brookfield' },
  { value: 'Tianguá', label: 'Tianguá' },
  { value: 'AES', label: 'AES' }
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
