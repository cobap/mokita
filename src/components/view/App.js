import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import fire from './fire';

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

const empresas = [
  { value: 'EUM Montage', label: 'EUM Montage' },
  { value: 'Eurogruas', label: 'Eurogruas' },
  { value: 'Field Core', label: 'Field Core' },
  { value: 'Service, Darcy', label: 'Darcy Pacheco' },
  { value: 'Totalwind', label: 'Totalwind' },
  { value: 'MS Servicos', label: 'MS Servicos' },
  { value: 'SSE', label: 'SSE' },
];

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

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numero_sr: '',
      empresa: 'Eurogruas',
      inicio_troubleshoot: new Date().toISOString().substring(0,16),
      inicio_reparo: new Date().toISOString().substring(0,16),
      fim_reparo: new Date().toISOString().substring(0,16),
      tipo_hora: 'Regular 1',
      complexo_eolico: 'CPFL',
      nome_tecnico: '',
      data_do_debrief: new Date().toISOString(),
      open: false,
      vertical: 'top',
      horizontal: 'center',
    };
  }

  handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ open: true });
        fire.database().ref('debrief').push({ numero_sr: this.state.numero_sr, empresa: this.state.empresa, inicio_troubleshoot: this.state.inicio_troubleshoot, inicio_reparo: this.state.inicio_reparo, fim_reparo: this.state.fim_reparo, tipo_hora: this.state.tipo_hora, complexo_eolico: this.state.complexo_eolico, nome_tecnico: this.state.nome_tecnico, data_do_debrief: this.state.data_do_debrief });
        this.setState({ numero_sr: '' });
  };

  handleChange = campo_formulario => event => { this.setState({ [campo_formulario]: event.target.value, }); };
  // handleChange2 = inicio_debrief2 => event => { console.log('MUDOU INICIO DEBRIEF 2');; this.setState({ [inicio_debrief2]: event.target.value, }); };
  // handleChange3 = sr => event => { this.setState({ [sr]: event.target.value, }); };
  handleClose = () => { this.setState({ open: false }); };

  handleErroSR() {
    if(this.state.numero_sr.length !== 7) {
      return true;
    }
    return false;
  }

  handleErroData() {
    if((new Date(this.state.fim_reparo) - new Date(this.state.inicio_reparo))/3600000.0 > 14) {
      return true;
    }
    else if(this.state.fim_reparo <= this.state.inicio_reparo) {
      return true;
    }
    return false;
  }


  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open } = this.state;
    const { numero_sr, inicio_reparo, fim_reparo } = this.state;
    const data_menor_14 = (new Date(fim_reparo) - new Date(inicio_reparo))/3600000.0 < 14;
    const length_sr = numero_sr.length === 7;
    const data_no_futuro = fim_reparo > inicio_reparo
    const isEnabled = (data_menor_14 && length_sr) && data_no_futuro;

    return (
      <div className="App">
        <header className="App-header">
          <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField id="numero_sr" error={this.handleErroSR()} required label="Numero da SR" variant="standard" className={classes.textField} value={this.state.numero_sr} onChange={this.handleChange('numero_sr')} margin="normal" />
            <TextField id="empresa" select required label="Empresa" className={classes.textField} value={this.state.empresa} onChange={this.handleChange('empresa')} helperText="Selecione a empresa na qual trabalha" margin="normal">
              {empresas.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
            </TextField>
            {/* <TextField id="troubleshoot" required label="Inicio troubleshoot" type="datetime-local" variant="standard" value={this.state.inicio_troubleshoot} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleChange('inicio_troubleshoot')} /> */}
            <TextField id="reparo" required label="Inicio reparo" type="datetime-local" variant="standard" value={this.state.inicio_reparo} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleChange('inicio_reparo')} error={this.handleErroData()}/>
            <TextField id="fim_reparo" required label="Fim reparo" type="datetime-local" variant="standard" value={this.state.fim_reparo} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleChange('fim_reparo')} error={this.handleErroData()}/>
            <TextField id="tipo_hora" select required label="Tipo de hora" className={classes.textField} value={this.state.tipo_hora} onChange={this.handleChange('tipo_hora')} helperText="Selecione o tipo de hora trabalhada" margin="normal">
              {tipo_hora.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
            </TextField>
            <TextField id="complexo_eolico" select required label="Complexo Eólico" className={classes.textField} value={this.state.complexo_eolico} onChange={this.handleChange('complexo_eolico')} helperText="Selecione o parque no qual trabalhou" margin="normal">
              {complexo_eolico.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
            </TextField>
            <TextField id="nome_tecnico" required label="Nome Técnico" variant="standard" className={classes.textField} value={this.state.nome_tecnico} onChange={this.handleChange('nome_tecnico')} margin="normal" />
            <Button disabled={!isEnabled} variant="contained" type="submit" color="primary" fullWidth={true} className={classes.button}> Enviar </Button>
          </form>
        </header>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} onClose={this.handleClose} ContentProps={{ 'aria-describedby': 'message-id', }} message={ <span id="message-id">Debrief enviado com sucesso!</span>} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
