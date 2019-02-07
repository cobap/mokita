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

import VerificarDebrief from './../status/VerificarDebrief';

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

function Aprovacao(props) {
  const _aprovado = props.aprovado;
  if (_aprovado === 1) {
    return (
      <TableCell className={props.classes.celula} component="th" scope="row">
        <Button disabled variant="contained" fullWidth={false} className={props.classes.button} > Aprovado </Button>
      </TableCell>
    );
  }
  else if (_aprovado === -1) {
    return (
      <TableCell className={props.classes.celula} component="th" scope="row">
        <Button color="secondary" variant="contained" fullWidth={false} className={props.classes.button} > Rejeitado </Button>
      </TableCell>
    );
  }
  return (
    <TableCell className={props.classes.celula} component="th" scope="row">
      <Button variant="contained" color="secondary" fullWidth={false} className={props.classes.button} onClick={() => {props.aprovarDebrief(props.row, -1)}}> Rejeitar </Button>
      <Button variant="contained" color="primary" fullWidth={false} className={props.classes.button} onClick={() => {props.aprovarDebrief(props.row, 1)}}> Aprovar! </Button>
    </TableCell>
  );

}

class TabelaSR extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lista_debriefs: [],
        modo_editar: false,
        verificar_debrief: false
    };

    this.handleEdicaoSR = this.handleEdicaoSR.bind(this)

  }



  atualizaDebriefs() {
    console.log('ATUALIZANDO DEBRIEFS')
    let _temp = []
    var ref = fire.database().ref('debriefs');
    ref.once('value').then((snapshot) => {
        Object.values(snapshot.val()).forEach((key,values) => {
            if(key.complexo === this.props.windfarm) {
              key.key = key.sso_tecnico + key.data_do_debrief.substr(0, key.data_do_debrief.length-5) + key.numero_sr + ""
              _temp.push(key)
            }
        });
        this.setState({ lista_debriefs: _temp })
    });

    console.log('TERMINANDO ATUALIZACAO')

  }

  aprovarDebrief = (key, aprovado) => {
    let testekey = key.sso_tecnico + key.data_do_debrief.substr(0, key.data_do_debrief.length - 5) + key.numero_sr + ''
    key.aprovado = aprovado;
    key.editado = false;
    console.log(key)
    fire.database().ref('debriefs/' + testekey).set(key);
  }

  verificarLaborEMaterial = (key) => {
    console.log(key)
    this.setState({ verificar_debrief: true, detalhes_debrief: key });
  }

  componentDidUpdate(prevProps) { if (this.props.windfarm !== prevProps.windfarm) { console.log('MUDOU WINDFARM'); this.atualizaDebriefs(); } }

  handleFechaCriacaoSR(someArg) {
    this.setState({verificar_debrief: false });
    this.atualizaDebriefs();
  }

  handleCriacaoSR(someArg) {
    fire.database().ref('servicerequest/' + someArg.key).set(someArg);
    this.setState({verificar_debrief: false });
    this.atualizaDebriefs();
  }

  handleEdicaoSR() {
    this.setState({ modo_editar: false });
  }

  render() {
    const { classes } = this.props;
    var handleFechaCriacaoSR = this.handleFechaCriacaoSR;
    var handleCriacaoSR = this.handleCriacaoSR;

    return (
        <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Código SR</TableCell>
                <TableCell>SSO </TableCell>
                <TableCell>Turbina</TableCell>
                <TableCell>Data Debrief</TableCell>
                <TableCell>Labor e Material</TableCell>
                <TableCell>Aprovar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.lista_debriefs.map(row => (
                <TableRow key={row.key}>
                  <TableCell className={classes.celula} component="th" scope="row"> {row.numero_sr} </TableCell>
                  <TableCell className={classes.celula} component="th" scope="row"> {row.sso_tecnico} </TableCell>
                  <TableCell className={classes.celula} component="th" scope="row"> {row.numero_sr.substr(0, row.numero_sr.length - 12)} </TableCell>
                  <TableCell className={classes.celula} component="th" scope="row"> {row.data_do_debrief.substr(0, row.data_do_debrief.length - 5)} </TableCell>
                  <TableCell className={classes.celula} component="th" scope="row">
                    <Button variant="contained" fullWidth={false} className={classes.button} onClick={() => {this.verificarLaborEMaterial(row)}}> Verificar </Button>
                  </TableCell>
                  <Aprovacao aprovado={row.aprovado} row={row} classes={classes} aprovarDebrief={this.aprovarDebrief} />

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <VerificarDebrief open={this.state.verificar_debrief} turbina={false} detalhes_debrief={this.state.detalhes_debrief} handleFechaCriacaoSR = {handleFechaCriacaoSR.bind(this)} handleCriacaoSR = {handleCriacaoSR.bind(this)}/>
        </div>
      );
  }
}

export default withStyles(styles)(TabelaSR);
