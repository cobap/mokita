import React, { Component } from "react";

// Components
import Header from './../header/Header';
import TurbineHeader from './../header/TurbineHeader';

import TurbineViewer from './TurbineViewer';

import fire from './../../fire';

class ListTurbines extends Component {
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
      <>
        {/*
          <Header name={'ELA'} handleMudancaWindfarm = {handleMudancaWindfarm.bind(this)} handleMudancaStatus = {handleMudancaStatus.bind(this)} windfarm={this.state.windfarm} />
        */}
        <TurbineHeader />
        <TurbineViewer windfarm={this.state.windfarm} />;
      </>
    );
  }
}

export default ListTurbines;
