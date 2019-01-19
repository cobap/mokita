import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import wtg3 from './../css/wtg3.svg';

import CriaSR from './CriaSR';

import fire from './../../fire';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    logo: {
        textAlign: 'center'
    },
    botao: {
        textAlign: 'center'
    }
});

function TurbineStatus(props) {
  return (<img src={wtg3} height={32} alt="logo" />);
};

class DuplaListaTurbinas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      turbina_foi_selecionada: false,
      turbina_selecionada: false,
      falha_selecionada: null,
      openResultadoSR: false,
      checked: [0],
    };
  }

  handleClickSnackBar = () => {
    this.setState({ openResultadoSR: true });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openResultadoSR: false });
  };

  handleDetalhesFalha = (menu) => { this.setState({[menu] : !this.state[menu] }) };

  handleSelecionaTurbina = (event, turbina) => {
    this.setState({
      turbina_foi_selecionada: true,
      turbina_selecionada: this.props.turbines.find(_turbina => _turbina.wtgName === turbina),
    });
    // this.setState({ turbina_selecionada: this.props.turbines.find(turbina => turbina.wtgName == id) });
  };

  handleFechaCriacaoSR(someArg) {
    console.log('We pass argument from Child to Parent: ' + someArg);
    this.setState({turbina_foi_selecionada:false});
  }

  // abreCriacaoSR() { this.setState({ turbina_foi_selecionada: true }); }

  handleCriacaoSR(someArg) {
    console.log('Criar SR para: ' + someArg);
    console.log(someArg);
    someArg.windfarm = this.props.windfarm
    console.log(someArg.key);
    fire.database().ref('servicerequest').push( someArg );
    this.setState({turbina_foi_selecionada:false, openResultadoSR:true, codigo_sr:someArg.key });
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };


  render() {
    const { classes } = this.props;
    var handleFechaCriacaoSR = this.handleFechaCriacaoSR;
    var handleCriacaoSR = this.handleCriacaoSR;

    let turbinas = []

    if (this.props.turbines != null) {
      turbinas = this.props.turbines;
    }

    return (
      <div>
      <List component="nav" className={classes.root} >
        {turbinas.map((turbina) => {
          return (
            <div key={turbina.key}>
            {/* <ListItem button key={turbina.key} className={classes.nested} onClick={event => this.handleSelecionaTurbina(event, turbina.key)}>  */}

            <ListItem button key={turbina.key} className={classes.nested} onClick={this.handleToggle(turbina)}>
            <Checkbox checked={this.state.checked.indexOf(turbina) !== -1} tabIndex={-1} disableRipple />
              <ListItemIcon>
                <TurbineStatus status={turbina.currentState} />
              </ListItemIcon>
              <ListItemText inset primary={turbina.wtgName} />
            </ListItem>

            {/* <GridList cellHeight={160} className={classes.gridList} cols={3}> {turbinas.map(turbina => ( <GridListTile key={turbina.key} cols={3 || 1}> <TurbineStatus status={turbina.currentState} /> </GridListTile> ))} </GridList> */}
            </div>
          )
        })}

      </List>
      </div>
    );
  }
}

export default withStyles(styles)(DuplaListaTurbinas);
