import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Header from './../header/Header';

import fire from './../../fire';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
    display: 'flex',
    marginLeft: '50%'
  },
});

// const empresas = [
//   { value: 'EUM Montage', label: 'EUM Montage' },
//   { value: 'Eurogruas', label: 'Eurogruas' },
//   { value: 'Field Core', label: 'Field Core' },
//   { value: 'Service, Darcy', label: 'Darcy Pacheco' },
//   { value: 'Totalwind', label: 'Totalwind' },
//   { value: 'MS Servicos', label: 'MS Servicos' },
//   { value: 'SSE', label: 'SSE' },
// ];

const tipo_hora = [
  { value: 'DT double time 1st', label: 'DT double time 1st' },
  { value: 'OT 1sr Shift', label: 'OT 1sr Shift' },
  { value: 'Regular 1', label: 'Regular 1' },
];

const complexo_eolico = [
  { value: 'Uniao dos Ventos', label: 'Uniao dos Ventos' },
  { value: 'CPFL', label: 'CPFL' },
  { value: 'Asa Branca', label: 'Asa Branca' },
  { value: 'Riachão', label: 'Riachão' },
  { value: 'COPEL', label: 'COPEL' },
  { value: 'RDV', label: 'RDV' },
  { value: 'Miassaba', label: 'Miassaba' },
  { value: 'Chapada I', label: 'Chapada I' },
  { value: 'Chapada II&III', label: 'Chapada II&III' },
  { value: 'Ventos 3', label: 'Ventos 3' },
  { value: 'Caldeirão', label: 'Caldeirão' },
  { value: 'Delta 2', label: 'Delta 2' },
  { value: 'Delta 3', label: 'Delta 3' },
  { value: 'Amontada', label: 'Amontada' },
  { value: 'Trairi', label: 'Trairi' },
  { value: 'Eletrosul', label: 'Eletrosul' },
  { value: 'Pontal', label: 'Pontal' },
  { value: 'Senandes', label: 'Senandes' },
  { value: 'Sta Brigida', label: 'Sta Brigida' },
  { value: 'São Clemente', label: 'São Clemente' },
  { value: 'PEC', label: 'PEC' },
  { value: 'PEC Expansão', label: 'PEC Expansão' },
  { value: 'Brazil Wind', label: 'Brazil Wind' },
  { value: 'Rio Energy', label: 'Rio Energy' },
  { value: 'Brotas', label: 'Brotas' },
  { value: 'Campo Largo', label: 'Campo Largo' },
  { value: 'CER', label: 'CER' },
  { value: 'Brookfield', label: 'Brookfield' },
  { value: 'Tianguá', label: 'Tianguá' },
  { value: 'AES', label: 'AES' }
];

class Debrief extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numero_sr: '',
      keyLabor: 1,
      keyMaterial: 1,
      labor: [{ key: 0, inicio: new Date().toISOString().substring(0,16), fim: new Date().toISOString().substring(0,16), }],
      material: [{ key: 0, partnumber: '', serialnumber:'', quantidade: 1}],
      novo_labor: {},
      inicio_troubleshoot: new Date().toISOString().substring(0,16),
      inicio_reparo: new Date().toISOString().substring(0,16),
      fim_reparo: new Date().toISOString().substring(0,16),
      tipo_hora: 'Regular 1',
      complexo_eolico: 'PEC',
      sso_tecnico: '',
      data_do_debrief: new Date().toISOString(),
      open: false,
      vertical: 'top',
      horizontal: 'center',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ open: true });
    fire.database().ref('debriefs').push();
    // { numero_sr: this.state.numero_sr, sso_tecnico: this.state.sso_tecnico, data_do_debrief: this.state.data_do_debrief, labor: this.state.labor, material: this.state.material }
    // this.setState({ numero_sr: '' });
  };

  handleChange = campo_formulario => event => { this.setState({ [campo_formulario]: event.target.value, }); };

  handleClose = () => { this.setState({ open: false }); };

  handleErroSR() {
    if(this.state.numero_sr.length !== 7) { return true; }
    return false;
  }

  handleErroData() {
    if((new Date(this.state.fim_reparo) - new Date(this.state.inicio_reparo))/3600000.0 > 14) { return true; }
    else if(this.state.fim_reparo <= this.state.inicio_reparo) { return true; }
    return false;
  }

  handleMudancaAtividade = idx => evt => {
    const nova_atividade = this.state.labor.map((atividade, sidx) => {
      if (idx !== sidx) return atividade;
      return { ...atividade, [evt.target.id]: evt.target.value };
    });
    this.setState({ labor: nova_atividade });
  };

  handleMudancaParts = idx => evt => {
    const nova_parts = this.state.material.map((parts, sidx) => {
      if (idx !== sidx) return parts;
      return { ...parts, [evt.target.id]: evt.target.value };
    });
    this.setState({ material: nova_parts });
  };

  adicionaNovoLabor = () => {
      let _novolabor = { key: this.state.keyLabor, inicio: new Date().toISOString().substring(0,16), fim: new Date().toISOString().substring(0,16), }
      this.setState((prevState, props) => ({ labor: this.state.labor.concat([_novolabor]), keyLabor: _novolabor.key + 1 }));
  };

  adicionaNovaPart = () => {
      let _novapart = { key: this.state.keyMaterial, partnumber: '', serialnumber:'', quantidade: 1 }
      this.setState((prevState, props) => ({ material: this.state.material.concat([_novapart]), keyMaterial: _novapart.key + 1 }));
  };


  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open } = this.state;
    const { numero_sr, inicio_reparo, fim_reparo } = this.state;
    const data_menor_14 = (new Date(fim_reparo) - new Date(inicio_reparo))/3600000.0 < 14;
    const length_sr = numero_sr.length === 7;
    const data_no_futuro = fim_reparo > inicio_reparo
    const isEnabled = (data_menor_14 && length_sr) && data_no_futuro;

    return (
      <div className="Debrief">
        <header className="Debrief-header">
          <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField id="numero_sr" error={this.handleErroSR()} required label="Codigo da SR" variant="standard" className={classes.textField} value={this.state.numero_sr} onChange={this.handleChange('numero_sr')} margin="normal" />

            {this.state.labor.map((atividade, idx) => (
                <div key={atividade.key}>
                    <TextField id="inicio" required label="Inicio atividade" type="datetime-local" variant="standard" value={atividade.inicio} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <TextField id="fim" required label="Fim atividade" type="datetime-local" variant="standard" value={atividade.fim} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                </div>
            ))}
            <Button onClick={() => {this.adicionaNovoLabor()}} color="secondary"> +Labor </Button>

            {this.state.material.map((material, idx) => (
                <div key={material.key}>
                    <TextField id="partnumber" required label="Part Number" type="standard" variant="standard" value={material.partnumber} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="serialnumber" label="Serial Number" type="standard" variant="standard" value={material.serialnumber} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="quantidade" required label="Quantidade" type="number" variant="standard" value={material.quantidade} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                </div>
            ))}
            <Button onClick={() => {this.adicionaNovaPart()}} color="secondary"> +Parts </Button>

            <TextField id="tipo_hora" select required label="Tipo de hora" className={classes.textField} value={this.state.tipo_hora} onChange={this.handleChange('tipo_hora')} helperText="Selecione o tipo de hora trabalhada" margin="normal">
              {tipo_hora.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
            </TextField>

            <TextField id="complexo_eolico" select required label="Complexo Eólico" className={classes.textField} value={this.state.complexo_eolico} onChange={this.handleChange('complexo_eolico')} helperText="Selecione o parque no qual trabalhou" margin="normal">
              {complexo_eolico.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
            </TextField>

            <TextField id="sso_tecnico" required label="SSO Técnico" variant="standard" className={classes.textField} value={this.state.sso_tecnico} onChange={this.handleChange('sso_tecnico')} margin="normal" />

            <Button disabled={!isEnabled} variant="contained" type="submit" color="primary" fullWidth={true} className={classes.button}> Debrifar! </Button>
          </form>
        </header>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} onClose={this.handleClose} ContentProps={{ 'aria-describedby': 'message-id', }} message={ <span id="message-id">Debrief enviado com sucesso!</span>} />
      </div>
    );
  }
}

export default withStyles(styles)(Debrief);
