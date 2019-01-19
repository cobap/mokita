import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import fire from './../../fire';

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
        lista_sr: [],
    };

  }

  atualizaSR() {
    var ref = fire.database().ref('servicerequest');
    // ref.orderByChild('windfarm').equalTo(this.props.windfarm).on('value', (snapshot) => { this.setState({ lista_sr: [snapshot.val()] }); });
    ref.orderByChild('windfarm').equalTo(this.props.windfarm).on('value', (snapshot) => {
        Object.values(snapshot.val()).forEach((key,values) => this.setState({ lista_sr: [...this.state.lista_sr, key] }) );
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.windfarm !== prevProps.windfarm) {
        this.atualizaSR()
    }
  }

  render() {
    const { classes } = this.props;

    // console.log(this.state.lista_sr.map(row => {console.log(row); console.log('--')}))

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Código SR</TableCell>
              <TableCell>Turbina</TableCell>
              <TableCell>Data Criação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {this.state.lista_sr.map(row => (
                  <TableRow key={row.key}>
                      <TableCell className={classes.celula} component="th" scope="row"> {row.key} </TableCell>
                      <TableCell className={classes.celula} component="th" scope="row"> {row.wtg} </TableCell>
                      <TableCell className={classes.celula} component="th" scope="row"> {row.data} </TableCell>
                  </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(TabelaSR);
