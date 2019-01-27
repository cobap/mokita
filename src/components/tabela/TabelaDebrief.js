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

import EditarSR from './../status/EditarSR';

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
        lista_debrief: [],
        editar_debrief: false
    };
  }

  atualizaSR() {
    console.log('ATUALIZANDO SR')

    let _temp = []

    var ref = fire.database().ref('servicerequest');
    ref.once('value').then((snapshot) => {
        Object.values(snapshot.val()).forEach((key,values) => {
            console.log('CHAVE')
            console.log(key)
            if(key.windfarm === this.props.windfarm) {
                _temp.push(key)
            }
            // this.setState({ lista_sr: [...this.state.lista_sr, key] })
        });
        this.setState({ lista_sr: _temp })
    });


    // ref.orderByChild('windfarm').equalTo(this.props.windfarm).on('value', (snapshot) => {
    //     Object.values(snapshot.val()).forEach((key,values) => {
    //         console.log('Adicionando nova chave')
    //         console.log(key)
    //         this.setState({ lista_sr: [...this.state.lista_sr, key] })
    //     });
    // });


  }

  editarSR = (key) => {
      var ref = fire.database().ref('servicerequest');
      ref.orderByChild('key').equalTo(key).on('value', (snapshot) => {
          this.setState({ editar_sr: true, detalhes_sr: snapshot.val()[Object.keys(snapshot.val())[0]], lista_sr: []});
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.windfarm !== prevProps.windfarm) {
        console.log('MUDOU WINDFARM')
        this.atualizaSR();
    }
  }

  handleFechaCriacaoSR(someArg) {
    this.setState({editar_sr: false });
    this.atualizaSR();
  }

  handleCriacaoSR(someArg) {
    fire.database().ref('servicerequest/' + someArg.key).set(someArg);
    this.setState({editar_sr: false });
    this.atualizaSR();
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
              <TableCell>Turbina</TableCell>
              <TableCell>Data Criação</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {this.state.lista_sr.map(row => (
                  <TableRow key={row.key}>
                      <TableCell className={classes.celula} component="th" scope="row"> {row.key} </TableCell>
                      <TableCell className={classes.celula} component="th" scope="row"> {row.wtg} </TableCell>
                      <TableCell className={classes.celula} component="th" scope="row"> {row.data} </TableCell>
                      <TableCell className={classes.celula} component="th" scope="row">
                        <Button variant="contained" color="primary" fullWidth={false} className={classes.button} onClick={() => {this.editarSR(row.key)}}> Editar </Button>
                    </TableCell>
                  </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
      <EditarSR open={this.state.editar_sr} turbina={false} detalhes_sr={this.state.detalhes_sr} handleFechaCriacaoSR = {handleFechaCriacaoSR.bind(this)} handleCriacaoSR = {handleCriacaoSR.bind(this)}/>
    </div>
    );
  }
}

export default withStyles(styles)(TabelaSR);
