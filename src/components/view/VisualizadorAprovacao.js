// React
import React, { Component } from "react";
import PropTypes from 'prop-types';

// Components
import TabelaAprovacao from './../tabela/TabelaAprovacao';
import Header from './../header/Header';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import fire from './../../fire';

const styles = theme => ({
  root: {
  },
  headline: {
    background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
    color: 'white',
    flex: 'auto',
    fontSize: 18,
    width: 140,
    textAlign: 'center',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 7,
  }
});

class CenteredGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
        windfarm: '',
        sso_tecnico: '',
    };

  }

  handleMudancaWindfarm(novo_parque) { this.setState({ windfarm: novo_parque }) }
  handleMudancaStatus(novo_status) { this.setState({ filtro: novo_status, status_turbinas: this.state._status_turbinas_backup.filter(turbina => turbina.currentState === novo_status)}); }

  handleChange = campo_formulario => event => { this.setState({ [campo_formulario]: event.target.value, }); };

  buscarDebriefs = () => {
    let sso_temp = this.state.sso_tecnico
    this.setState({ _sso_tecnico: sso_temp, sso_tecnico: '' });
  };

  render() {
    const { classes } = this.props;
    var handleMudancaWindfarm = this.handleMudancaWindfarm;
    var handleMudancaStatus = this.handleMudancaStatus;

    return (
      <div className={classes.root}>
        <Header handleMudancaWindfarm = {handleMudancaWindfarm.bind(this)} handleMudancaStatus = {handleMudancaStatus.bind(this)} windfarm={this.state.windfarm} />

        <Grid container justify="center">
          <Grid item xs={12} lg={12}> <TabelaAprovacao windfarm={this.state.windfarm} sso_tecnico={this.state._sso_tecnico} /> </Grid>
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(CenteredGrid);
