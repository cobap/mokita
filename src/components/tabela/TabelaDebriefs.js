import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import fire from './../../fire';

import MudancaDebrief from './../view/MudancaDebrief';



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    align: 'center'
  },
  table: {
    align: 'center'
  },
  celula: {
    align: 'center'
  }
});

class TabelaSR extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lista_debriefs: [],
        modo_editar: false
    };

    this.handleEdicaoSR = this.handleEdicaoSR.bind(this)

  }

  atualizaDebriefs() {
    console.log('ATUALIZANDO DEBRIEFS')
    console.log(this.props.sso_tecnico)
    let _temp = []
    var ref = fire.database().ref('debriefs');
    ref.once('value').then((snapshot) => {
        Object.values(snapshot.val()).forEach((key,values) => {
            if(key.sso_tecnico === this.props.sso_tecnico) {
              key._id = key.numero_sr + key.data_do_debrief
              _temp.push(key)
            }
        });
        this.setState({ lista_debriefs: _temp })
    });

    console.log('TERMINANDO ATUALIZACAO')

  }

  editarDebrief = (key) => {
      console.log(key)
      this.setState({ modo_editar: true, debrief_editavel: key });
  }

  excluirDebrief = (key) => {
    console.log(key)
    fire.database().ref('debriefs/' + key.key).remove();
    this.atualizaDebriefs();
  }

  componentDidUpdate(prevProps) {
    if (this.props.sso_tecnico !== prevProps.sso_tecnico) {
        console.log('MUDOU SSO TECNICO')
        this.atualizaDebriefs();
    }
  }

  handleFechaCriacaoSR(someArg) {
    this.setState({editar_sr: false });
    this.atualizaDebriefs();
  }

  handleCriacaoSR(someArg) {
    fire.database().ref('servicerequest/' + someArg.key).set(someArg);
    this.setState({editar_sr: false });
    this.atualizaDebriefs();
  }

  handleEdicaoSR() {
    this.setState({ modo_editar: false });
  }

  render() {
    const { classes } = this.props;
    var handleFechaCriacaoSR = this.handleFechaCriacaoSR;
    var handleCriacaoSR = this.handleCriacaoSR;

    if(this.state.modo_editar) {
      return (
        <div>
          <MudancaDebrief editar={this.state.modo_editar} informacoes={this.state.debrief_editavel} handleEdicaoSR = {this.handleEdicaoSR}/>
        </div>
      );
    }
    else {
      return (
        <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Código SR</TableCell>
                <TableCell>Turbina</TableCell>
                <TableCell>Data Debrief</TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.lista_debriefs.map(row => (
                <TableRow key={row._id}>
                  <TableCell className={classes.celula} component="th" scope="row"> {row.numero_sr} </TableCell>
                  <TableCell className={classes.celula} component="th" scope="row"> {row.numero_sr.substr(0, row.numero_sr.length - 12)} </TableCell>
                  <TableCell className={classes.celula} component="th" scope="row"> {row.data_do_debrief.substr(0, row.data_do_debrief.length - 5)} </TableCell>
                  <TableCell className={classes.celula} component="th" scope="row">
                    <Button variant="contained" color="primary" fullWidth={false} className={classes.button} onClick={() => {this.editarDebrief(row)}}> Editar </Button>
                    <Button variant="contained" color="secondary" fullWidth={false} className={classes.button} onClick={() => {this.excluirDebrief(row)}}> Excluir </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {/* <EditarSR open={this.state.editar_sr} turbina={false} detalhes_sr={this.state.detalhes_sr} handleFechaCriacaoSR = {handleFechaCriacaoSR.bind(this)} handleCriacaoSR = {handleCriacaoSR.bind(this)}/> */}
        </div>
      );
    }
  }
}

export default withStyles(styles)(TabelaSR);
