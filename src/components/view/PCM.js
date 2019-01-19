// React
import React, { Component } from "react";
import PropTypes from 'prop-types';

// Components
import DuplaListaTurbinas from './../status/DuplaListaTurbinas';
import CriaMultiplasSR from './../status/CriaMultiplasSR';
import Header from './../header/Header';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import fire from './../../fire';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    // display: 'flex',
    // alignItems: 'center',
    // width: 400,
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
},
botao: {
    textAlign: 'center'
},
pesquisa: {
    marginBottom: 20,
    marginTop: 10
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
      filtro: '',
    };
  }

  atualizaTurbinas(novo_parque) {
    var ref = fire.database().ref(novo_parque);
    ref.once('value').then((snapshot) => {
        this.setState({ status_turbinas: snapshot.val(), isLoadingTurbineStatus: false, windfarm: novo_parque });
    });
  }

  filtraTurbina = campo_formulario => event => { this.setState({ [campo_formulario]: event.target.value, }); };

  handleMudancaWindfarm(novo_parque) { this.atualizaTurbinas(novo_parque) }
  handleMudancaStatus(novo_status) { this.setState({ filtro: novo_status, status_turbinas: this.state._status_turbinas_backup.filter(turbina => turbina.currentState === novo_status)}); }

  render() {
    const { classes } = this.props;
    var handleMudancaWindfarm = this.handleMudancaWindfarm;
    var handleMudancaStatus = this.handleMudancaStatus;

    return (
      <div className={classes.root}>
        <Header handleMudancaWindfarm = {handleMudancaWindfarm.bind(this)} handleMudancaStatus = {handleMudancaStatus.bind(this)} windfarm={this.state.windfarm} />

        <Grid container justify="center">
            <Grid item >
                <Paper className={classes.pesquisa} elevation={3}>
                    <IconButton className={classes.iconButton} aria-label="Menu">
                        <SearchIcon />
                    </IconButton>
                    <InputBase id='filtro' value={this.state.filtro} onChange={this.filtraTurbina('filtro')} className={classes.input} placeholder="Pesquisar Turbina" />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={12}> <DuplaListaTurbinas turbines={this.state.status_turbinas} windfarm={this.state.windfarm} /> </Grid>
            <Grid item xs={1} lg={1}> <Button className={classes.botao} variant="contained" color="primary"> Criar SR </Button> </Grid>
        </Grid>

        {/* <CriaMultiplasSR open={this.state.turbina_foi_selecionada} turbina={this.state.turbina_selecionada} handleFechaCriacaoSR = {handleFechaCriacaoSR.bind(this)} handleCriacaoSR = {handleCriacaoSR.bind(this)}/> */}
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

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
