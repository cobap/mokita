// React
import React, { Component } from "react";
import PropTypes from 'prop-types';

// Components
import ListaTurbinas from './../status/ListaTurbinas';
import Header from './../header/Header';

// Material UI
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

import fire from './../../fire';

// var database = fire.database();
// var dados_turbina = database.ref("UDV")

const styles = theme => ({
  root: {
  },
  headline: {
    // backgroundColor: '#2C5364',
    background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
    color: 'white',
    flex: 'auto',
    fontSize: 18,
    // fontWeight: 'bold',
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
      isLoadingTurbineStatus: false,
      status_turbinas: [],
      _status_turbinas_backup: [],
      windfarm: '',
      filtro: 5,
    };

    // var handleMudancaWindfarm = this.handleMudancaWindfarm.bind(this);
    // var handleMudancaStatus = this.handleMudancaStatus.bind(this);
  }

  atualizaTurbinas(novo_parque) {
    var ref = fire.database().ref(novo_parque);
    ref.once('value').then((snapshot) => {
        this.setState({ status_turbinas: snapshot.val(), isLoadingTurbineStatus: false, windfarm: novo_parque });
    });
  }

  componentWillMount() {
      // this.atualizaTurbinas()
  }

  componentDidMount() {
      // setInterval(this.atualizaTurbinas, 50000);
  }

  handleMudancaWindfarm(novo_parque) {
    // fetch('/turbine_status/' + novo_parque)
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ status_turbinas: data, _status_turbinas_backup: data, isLoadingTurbineStatus: false, windfarm: novo_parque }))
    this.atualizaTurbinas(novo_parque)
  }

  handleMudancaStatus(novo_status) {
    this.setState({ filtro: novo_status, status_turbinas: this.state._status_turbinas_backup.filter(turbina => turbina.currentState === novo_status)});
  }

  render() {
    const { classes } = this.props;
    var handleMudancaWindfarm = this.handleMudancaWindfarm;
    var handleMudancaStatus = this.handleMudancaStatus;

    return (
      <div className={classes.root}>
        <Header handleMudancaWindfarm = {handleMudancaWindfarm.bind(this)} handleMudancaStatus = {handleMudancaStatus.bind(this)} windfarm={this.state.windfarm} />

        <Grid container justify="center">
          {/* Status Turbinas */}
          {/* <Grid item xs={12} lg={12}> <TurbinesStatus turbines={this.state.status_turbinas} /> </Grid> */}
          {/* <Grid item xs={12} lg={12}> <TabelaStatus turbines={this.state.status_turbinas} /> </Grid> */}
          <Grid item xs={12} lg={12}> <ListaTurbinas turbines={this.state.status_turbinas} /> </Grid>
        </Grid>

      </div>
    );
  }
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
