import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import wtg3 from './../css/wtg3.svg';

import CriaSR from './CriaSR';

import fire from './../../fire';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  logo: {
    textAlign: 'center'
  }
});

function TurbineStatus(props) {
  return (<img src={wtg3} height={32} alt="logo" />);
};

class ListaTurbinas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      turbina_foi_selecionada: false,
      turbina_selecionada: false,
      falha_selecionada: null,
      openResultadoSR: false,
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

  handleCriacaoSR(someArg) {
    console.log('Criar SR para: ' + someArg);
    console.log(someArg);
    someArg.windfarm = this.props.windfarm
    console.log(someArg.key);
    fire.database().ref('servicerequest/' + someArg.key).set( someArg );
    this.setState({turbina_foi_selecionada:false, openResultadoSR:true, codigo_sr:someArg.key });
  }

  render() {
    const { classes } = this.props;
    var handleFechaCriacaoSR = this.handleFechaCriacaoSR;
    var handleCriacaoSR = this.handleCriacaoSR;

    let turbinas = []

    if (this.props.turbines != null) {
      turbinas = this.props.turbines;
    }

    console.log(this.props.turbines);

    return (
      <div>
      <List component="nav" subheader={<ListSubheader component="div">Lista de Turbinas</ListSubheader>} className={classes.root} >
        {turbinas.map((turbina) => {
          return (
            <div key={turbina.key}>
              {turbina.faults != null? (
                <div>
                  <ListItem button onClick={()=>{this.handleDetalhesFalha(turbina.wtgName)}}>
                    <ListItemIcon style={{height: 32}}>
                      <TurbineStatus status={turbina.currentState} />
                    </ListItemIcon>
                    <ListItemText inset primary={turbina.wtgName} />
                    {this.state[turbina.wtgName] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state[turbina.wtgName]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {turbina.faults.map((falha) => { return (
                        <ListItem button key={falha.name} className={classes.nested} onClick={event => this.handleSelecionaTurbina(event, turbina.key)}>
                          <ListItemIcon>
                            <TurbineStatus status={turbina.currentState} />
                          </ListItemIcon>
                          <ListItemText inset primary={falha.name + ' || ' + falha.time} secondary={falha.text} />
                        </ListItem>
                      )})}
                    </List>
                  </Collapse>
                </div>
              ) : (
                <ListItem button key={turbina.key} className={classes.nested} onClick={event => this.handleSelecionaTurbina(event, turbina.key)}>
                  <ListItemIcon>
                    <TurbineStatus status={turbina.currentState} />
                  </ListItemIcon>
                  <ListItemText inset primary={turbina.wtgName} />
                </ListItem>
              )}
            </div>
          )
        })}

      </List>
      <CriaSR open={this.state.turbina_foi_selecionada} turbina={this.state.turbina_selecionada} handleFechaCriacaoSR = {handleFechaCriacaoSR.bind(this)} handleCriacaoSR = {handleCriacaoSR.bind(this)}/>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }} open={this.state.openResultadoSR} autoHideDuration={6000} onClose={this.handleCloseSnackBar} ContentProps={{ 'aria-describedby': 'message-id',}}
        message={<span id="message-id">SR Criada com sucesso! Codigo: {this.state.codigo_sr} </span>} action={[
        <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleCloseSnackBar} >
            <CloseIcon />
        </IconButton>,]}
      />
      </div>
    );
  }
}

export default withStyles(styles)(ListaTurbinas);
