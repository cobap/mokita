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

// import wtg_online from './../css/wtg_1.svg';
// import wtg_fault from './../css/wtg_5.svg';
// import wtg_repair from './../css/wtg_repair.svg';
// import wtg_maintenance from './../css/wtg_maintenance.svg';
// import wtg_nocom from './../css/wtg_nocom.svg';

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

// function TurbineStatus(props) {
//   const status = props.status;
//   if (status === 1 || status === 2 || status === 3) {
//     return (<img src={wtg_online} height={32} alt="logo" />);
//   }
//   else if (status === 5)
//     return (<img src={wtg_fault} height={32} alt="logo" />);
//   else if (status === 10)
//     return (<img src={wtg_repair} height={32} alt="logo" />);
//   else if (status === 11)
//     return (<img src={wtg_maintenance} height={32} alt="logo" />);
//   else if (status === 0){
//     return (<img src={wtg_nocom} height={32} alt="logo" />);
//   }
//   else {
//     return (<img src={wtg_repair} height={32} alt="logo" />);
//   }
// };

class ListaTurbinas extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      turbina_foi_selecionada: false,
      turbina_selecionada: false,
      falha_selecionada: null,
    };
  }


  handleDetalhesFalha = (menu) => { this.setState({[menu] : !this.state[menu] }) };

  handleSelecionaTurbina = (event, turbina, falha) => {
    this.setState({
      turbina_foi_selecionada: true,
      turbina_selecionada: this.props.turbines.find(_turbina => _turbina.wtgName === turbina),
      falha_selecionada: falha
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
    this.setState({turbina_foi_selecionada:false});

    fetch("/enviar_sr", { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }, mode: "cors", body: JSON.stringify(someArg) })
      .then(response => console.log(response));

  }

  handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ open: true });
        fire.database()
          .ref('debrief').push(
            { numero_sr: this.state.numero_sr, empresa: this.state.empresa, inicio_troubleshoot: this.state.inicio_troubleshoot, inicio_reparo: this.state.inicio_reparo, fim_reparo: this.state.fim_reparo, tipo_hora: this.state.tipo_hora, complexo_eolico: this.state.complexo_eolico, nome_tecnico: this.state.nome_tecnico, data_do_debrief: this.state.data_do_debrief },
            function(error) {
              if(error) { console.log(error) }
              else { console.log('Dados salvos com sucesso!') }
            }
          );
        this.setState({ numero_sr: '' });
  };

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
                      {/* <TurbineStatus status={turbina.currentState} /> */}
                    </ListItemIcon>
                    <ListItemText inset primary={turbina.wtgName} />
                    {this.state[turbina.wtgName] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state[turbina.wtgName]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {turbina.faults.map((falha) => { return (
                        <ListItem button key={falha.name} className={classes.nested} onClick={event => this.handleSelecionaTurbina(event, turbina.key, falha.name)}>
                          <ListItemIcon>
                            {/* <TurbineStatus status={turbina.currentState} /> */}
                          </ListItemIcon>
                          <ListItemText inset primary={falha.name + ' || ' + falha.time} secondary={falha.text} />
                        </ListItem>
                      )})}
                    </List>
                  </Collapse>
                </div>
              ) : (
                <ListItem button>
                  <ListItemIcon>
                    {/* <TurbineStatus status={turbina.currentState} /> */}
                  </ListItemIcon>
                  <ListItemText inset primary={turbina.wtgName} />
                </ListItem>
              )}
            </div>
          )
        })}

      </List>
      <CriaSR open={this.state.turbina_foi_selecionada} turbina={this.state.turbina_selecionada} falha={this.state.falha_selecionada} handleFechaCriacaoSR = {handleFechaCriacaoSR.bind(this)} handleCriacaoSR = {handleCriacaoSR.bind(this)}/>
      </div>
    );
  }
}

export default withStyles(styles)(ListaTurbinas);
