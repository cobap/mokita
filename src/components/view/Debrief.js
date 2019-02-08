import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Header from './../header/Header';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


import fire from './../../fire';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginBottom: 10
    },
    detalhes: {
        marginTop: 10,
        marginBottom: 20,
        background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
        marginLeft: 40,
        marginRight: 40,
        textAlign: 'center',
        color: 'white'
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
    textField: {
        marginLeft: 30,
        marginRight: 30,
        width: 320,
    },
    botaoplus: {
        textAlign: 'center',
        marginLeft: '37%',
        // margimRight: '50%',
    },
    botaoexclusao: {
    }
});

const tipohora = [
  { value: 'Aplicada', label: 'Aplicada' },
  { value: 'NAO Aplicada', label: 'NAO Aplicada' },
];

const laborcodes = [
  { value: 'LBR01', label: 'LBR01' },
  { value: 'TVL01', label: 'TVL01' },
  { value: 'ADM01', label: 'ADM01' },
  { value: 'JPR01', label: 'JPR01' },
  { value: 'TBL01', label: 'TBL01' },
  { value: 'WTR01', label: 'WTR01' },
  { value: 'CCS01', label: 'CCS01' },
  { value: 'EHS01', label: 'EHS01' },
  { value: 'TRA01', label: 'TRA01' },
  { value: 'Time Off', label: 'Time Off' },
  { value: 'On Call', label: 'On Call' }
];

const lista_hourstype = [
  { value: 'Regular 1', label: 'Regular 1' },
  { value: 'Bereavement', label: 'Bereavement (Licença-nojo - falecimento)' },
  { value: 'Vacation', label: 'Vacation (férias)' },
  { value: 'Floating Holiday', label: 'Floating Holiday (feriado ponte, interjornada)' },
  { value: 'Holiday', label: 'Holiday (feriado ou folga)' },
  { value: 'Personal Ilness Paid Hourly', label: 'Personal Ilness Paid Hourly (atestado médico)' },
  { value: 'On Call', label: 'On Call (sobreaviso - tempo aguardando chamada)' }
];

const tipo_peca = [
  { value: 'Order', label: 'Order' },
  { value: 'COI', label: 'COI' },
];

const complexo_eolico = [
  { value: 'UDV', label: 'Uniao dos Ventos' },
  { value: 'V3', label: 'Ventos 3' },
  { value: 'CPFL', label: 'CPFL' },
  { value: 'ASABRANCA', label: 'Asa Branca' },
  { value: 'RIACHAO', label: 'Riachão' },
  { value: 'COPEL', label: 'COPEL' },
  { value: 'RDV', label: 'RDV' },
  { value: 'CHAPADAI', label: 'Chapada I' },
  { value: 'CHAPADAII', label: 'Chapada II&III' },
  { value: 'CALDEIRAO', label: 'Caldeirão' },
  { value: 'OMEGA2', label: 'Delta 2' },
  { value: 'OMEGA3', label: 'Delta 3' },
  { value: 'AMONTADA', label: 'Amontada' },
  { value: 'TRAIRI', label: 'Trairi' },
  { value: 'ELETROSUL', label: 'Eletrosul' },
  { value: 'PONTAL', label: 'Pontal' },
  { value: 'SENANDES', label: 'Senandes' },
  { value: 'SANTABRIGIDA', label: 'Sta Brigida' },
  { value: 'SAOCLEMENTE', label: 'São Clemente' },
  { value: 'PEC', label: 'PEC' },
  { value: 'BW', label: 'Brazil Wind' },
  { value: 'BIOENERGY', label: 'Bio Energy' },
  { value: 'CAETITE', label: 'Caetite' },
  { value: 'UMBURANAS', label: 'Umburanas' },
  { value: 'BROTAS', label: 'Brotas' },
  { value: 'CAMPOLARGO', label: 'Campo Largo' },
  { value: 'CER', label: 'CER' },
  { value: 'TERRAFORM', label: 'Brookfield' },
  { value: 'TIANGUA', label: 'Tianguá' },
  { value: 'RENOVA', label: 'AES' }
];

class Debrief extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numero_sr: '',
      keyLabor: 1,
      keyMaterial: 1,
      labor: [],
      material: [],
      novo_labor: {},
      complexo_eolico: '',
      sso_tecnico: '',
      hourtype: 'Regular 1',
      tipopeca: 'Order',
      lista_problemcode: [],
      problemcode: 'GENERAL',
      lista_resolutioncode: [],
      resolutioncode: 'MAINTENANCE',
      data_do_debrief: new Date().toISOString(),
      open: false,
      vertical: 'top',
      horizontal: 'center',
    };

  }

  getProblemCode() {
    var ref = fire.database().ref('problemcode');
    ref.once('value').then((snapshot) => {
        this.setState({ lista_problemcode: snapshot.val() });
    });
  }

  getResolutionCode() {
    var ref = fire.database().ref('resolutioncode');
    ref.once('value').then((snapshot) => {
        this.setState({ lista_resolutioncode: snapshot.val() });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ open: true });
    console.log(this.state.material)
    let testekey = this.state.sso_tecnico + this.state.data_do_debrief.substring(0,19) + this.state.numero_sr + ''
    fire.database().ref('debriefs/' + testekey).set(
        { numero_sr: this.state.numero_sr, sso_tecnico: this.state.sso_tecnico, data_do_debrief: this.state.data_do_debrief, labor: this.state.labor, material: this.state.material, complexo: this.state.complexo_eolico, problemcode: this.state.problemcode, resolutioncode: this.state.resolutioncode, key: testekey, hourstype: this.state.hourtype, aprovado: 0, editado: true }
    );
    this.setState({ numero_sr: '' });
  };

  handleChange = campo_formulario => event => { this.setState({ [campo_formulario]: event.target.value, }); };

  handleClose = () => { this.setState({ open: false }); };

  handleMudancaAtividade = idx => evt => {
    const nova_atividade = this.state.labor.map((atividade, sidx) => {
      if (idx !== sidx) return atividade;
      return { ...atividade, [evt.target.id]: evt.target.value };
    });
    this.setState({ labor: nova_atividade });
  };

  handleMudancaAtividadeLaborCode = idx => evt => {
    const nova_atividade = this.state.labor.map((atividade, sidx) => {
      if (idx !== sidx) return atividade;
      return { ...atividade, [evt.target.name]: evt.target.value };
    });
    this.setState({ labor: nova_atividade });
  };

  handleMudancaParts = idx => evt => {
    if(evt.target.name === 'tipopeca') {
      const nova_parts = this.state.material.map((parts, sidx) => {
        if (idx !== sidx) return parts;
        return { ...parts, [evt.target.name]: evt.target.value };
      });
      this.setState({ material: nova_parts });
    }
    else {
      const nova_parts = this.state.material.map((parts, sidx) => {
        if (idx !== sidx) return parts;
        return { ...parts, [evt.target.id]: evt.target.value };
      });
      this.setState({ material: nova_parts });
    }
  };

  handleRemoveAtividade = idx => () => { this.setState((prevState, props) => ({ labor: this.state.labor.filter((s, sidx) => idx !== sidx), keyLabor: prevState.keyLabor-1 })); };
  handleRemoveParts = idx => () => { this.setState((prevState, props) => ({ material: this.state.material.filter((s, sidx) => idx !== sidx), keyMaterial: prevState.keyMaterial-1 })); };

  adicionaNovoLabor = () => {
      let _novolabor = { key: this.state.keyLabor, inicio: new Date().toISOString().substring(0,16), fim: new Date().toISOString().substring(0,16), laborcode: 'LBR01', tipohora: 'Aplicada', hourtype:'Regular 1' }
      this.setState((prevState, props) => ({ labor: this.state.labor.concat([_novolabor]), keyLabor: _novolabor.key + 1 }));
  };

  adicionaNovaPart = () => {
      let _novapart = { key: this.state.keyMaterial, partnumber: '', serialnumber:'', quantidade: 1, partnumberout: '', serialnumberout:'', quantidadeout: 1, tipopeca: 'Order' }
      this.setState((prevState, props) => ({ material: this.state.material.concat([_novapart]), keyMaterial: _novapart.key + 1 }));
  };

  handleMudancaWindfarm(novo_parque) { this.atualizaTurbinas(novo_parque) }
  handleMudancaStatus(novo_status) { this.setState({ filtro: novo_status, status_turbinas: this.state._status_turbinas_backup.filter(turbina => turbina.currentState === novo_status)}); }

  componentWillMount() {
     this.getProblemCode();
     this.getResolutionCode();
  }

  render() {
    const { classes } = this.props;
    const { vertical, horizontal, open } = this.state;
    var handleMudancaWindfarm = this.handleMudancaWindfarm;
    var handleMudancaStatus = this.handleMudancaStatus;

    return (
      <div className="Debrief">
        <Header handleMudancaWindfarm = {handleMudancaWindfarm.bind(this)} handleMudancaStatus = {handleMudancaStatus.bind(this)} windfarm={this.state.windfarm} />
        <header className="Debrief-header">
          <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> INFORMAÇOES GERAIS: </Typography> </Paper>
            <TextField id="numero_sr" required label="Codigo da SR" variant="standard" className={classes.textField} value={this.state.numero_sr} onChange={this.handleChange('numero_sr')} margin="normal" />
            <TextField id="complexo_eolico" select required label="Parque Eolico" className={classes.textField} value={this.state.complexo_eolico} onChange={this.handleChange('complexo_eolico')} margin="normal">
              {complexo_eolico.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
            </TextField>
            <TextField id="sso_tecnico" required label="SSO Técnico" variant="standard" className={classes.textField} value={this.state.sso_tecnico} onChange={this.handleChange('sso_tecnico')} margin="normal" />

            <TextField id="problemcode" select required label="Problem Code" className={classes.textField} value={this.state.problemcode} onChange={this.handleChange('problemcode')} margin="normal">
            {this.state.lista_problemcode.map(option => ( <MenuItem key={option.key} value={option.value}> {option.value} </MenuItem> ))}
            </TextField>

            <TextField id="resolutioncode" select required label="Resolution Code" className={classes.textField} value={this.state.resolutioncode} onChange={this.handleChange('resolutioncode')} margin="normal">
            {this.state.lista_resolutioncode.map(option => ( <MenuItem key={option.key} value={option.value}> {option.value} </MenuItem> ))}
            </TextField>

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> HORAS UTILIZADAS: </Typography> </Paper>
            {this.state.labor.map((atividade, idx) => (
                <div key={atividade.key}>
                    <Paper className={classes.detalhes} elevation={1}>
                        <Typography variant="p" component="p"> Atividade-{atividade.key} </Typography>
                    </Paper>
                    <TextField id="inicio" required label="Inicio atividade" type="datetime-local" variant="standard" value={atividade.inicio} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <TextField id="fim" required label="Fim atividade" type="datetime-local" variant="standard" value={atividade.fim} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <TextField id="hourtype" name={'hourtype'} select required label="Hour Type" className={classes.textField} value={atividade.hourtype} onChange={this.handleMudancaAtividadeLaborCode(idx)}>
                      {lista_hourstype.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                    </TextField>
                    <TextField id="labor" name={'laborcode'} select required label="Labor code" className={classes.textField} value={atividade.laborcode} onChange={this.handleMudancaAtividadeLaborCode(idx)}>
                      {laborcodes.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                    </TextField>
                    <TextField id="tipohora" select name={'tipohora'} required label="Tipo hora" className={classes.textField} value={atividade.tipohora} onChange={this.handleMudancaAtividadeLaborCode(idx)}>
                      {tipohora.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                    </TextField>
                    <IconButton onClick={this.handleRemoveAtividade(idx)} aria-label="Delete" className={classes.margin}> <DeleteIcon fontSize="small" /> </IconButton>
                </div>
            ))}
            <Button className={classes.botaoplus} onClick={() => {this.adicionaNovoLabor()}} color="secondary"> +Labor </Button>
            <Divider />
            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> MATERIAIS USADOS: </Typography> </Paper>
            {this.state.material.map((material, idx) => (
                <div key={material.key}>
                    <Paper className={classes.detalhes} elevation={1}> <Typography variant="p" component="p"> Peça-{material.key} </Typography> </Paper>
                    <TextField id="partnumber" label="Part Number In" type="standard" variant="standard" value={material.partnumber} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="serialnumber" label="Serial Number In" type="standard" variant="standard" value={material.serialnumber} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="quantidade" label="Quantidade In" type="number" variant="standard" value={material.quantidade} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="partnumberout" label="Part Number Out" type="standard" variant="standard" value={material.partnumberout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="serialnumberout" label="Serial Number Out" type="standard" variant="standard" value={material.serialnumberout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="quantidadeout" label="Quantidade Out" type="number" variant="standard" value={material.quantidadeout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="tipopeca" name="tipopeca" select required label="Tipo peça" className={classes.textField} value={material.tipopeca} onChange={this.handleMudancaParts(idx)}>
                      {tipo_peca.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                    </TextField>
                    <IconButton onClick={this.handleRemoveParts(idx)} aria-label="Delete" className={classes.margin}> <DeleteIcon fontSize="small" /> </IconButton>
                </div>
            ))}
            <Button className={classes.botaoplus} onClick={() => {this.adicionaNovaPart()}} color="secondary"> +Parts </Button>

            {/*
                <TextField id="tipo_hora" select required label="Tipo de hora" className={classes.textField} value={this.state.tipo_hora} onChange={this.handleChange('tipo_hora')} helperText="Selecione o tipo de hora trabalhada" margin="normal">
                {tipo_hora.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                </TextField>
            */}

            <Button disabled={false} variant="contained" type="submit" color="primary" fullWidth={true} className={classes.button}> Debrifar! </Button>
          </form>
        </header>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} onClose={this.handleClose} ContentProps={{ 'aria-describedby': 'message-id', }} message={ <span id="message-id">Debrief enviado com sucesso!</span>} />
      </div>
    );
  }
}

export default withStyles(styles)(Debrief);
