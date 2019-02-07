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

const parada_guindaste = [
  { value: 'Ambulancia', label: 'Ambulancia', categoria: 1 },
  { value: 'Problema Guindaste Auxiliar', label: 'Problema Guindaste Auxiliar', categoria: 1 },
  { value: 'Problema Guindaste Principal', label: 'Problema Guindaste Principal', categoria: 1 },
  { value: 'Munck', label: 'Munck', categoria: 1 },
  { value: 'Torre iluminação', label: 'Torre iluminação', categoria: 1 },
  { value: 'Teste compactação do solo', label: 'Teste compactação do solo', categoria: 1 },
  { value: 'Gerador auxiliar', label: 'Gerador auxiliar', categoria: 1 },
  { value: 'Compressor auxiliar', label: 'Compressor auxiliar', categoria: 1 },
  { value: 'Documentação de EHS', label: 'Documentação de EHS', categoria: 1 },
  { value: 'Acidentes incidentes', label: 'Acidentes incidentes', categoria: 1 },
  { value: 'Solicitação cliente', label: 'Solicitação cliente', categoria: 2 },
  { value: 'Condições climaticas', label: 'Condições climaticas', categoria: 2 },
  { value: 'Questões técnicas', label: 'Questões técnicas', categoria: 2 },
];

const tipo_parada = [
  { value: 'Guindaste', label: 'Guindaste', categoria: 1 },
  { value: 'Outros', label: 'Outros', categoria: 2 },
];

const tiporepair = [
  { value: 'Inspecao', label: 'Inspeção', categoria: 0 },
  { value: 'MCE', label: 'MCE', categoria: 1 },
  { value: 'UpTowerRepair', label: 'Up Tower Repair', categoria: 2 },
  { value: 'DownTowerRepair', label: 'Down Tower Repair', categoria: 3 },
];

const subcategoria = [
  { value: 'Boroscopia Completa', label: 'Boroscopia Completa', categoria: 0},
  { value: 'Boroscopia Planetaria', label: 'Boroscopia Planetaria', categoria: 0},
  { value: 'Boroscopia Estagio Paralelo', label: 'Boroscopia Estagio Paralelo', categoria: 0},
  { value: 'Boroscopia Mainbearing', label: 'Boroscopia Mainbearing', categoria: 0},
  { value: 'Boroscopia Gerador', label: 'Boroscopia Gerador', categoria: 0},
  { value: 'Inspeção por Drone', label: 'Inspeção por Drone', categoria: 0},
  { value: 'Pitch bearing - Down Tower', label: 'Pitch bearing - Down Tower', categoria: 1},
  { value: 'Pitch bearing - Up Tower', label: 'Pitch bearing - Up Tower', categoria: 1},
  { value: 'Gearbox', label: 'Gearbox', categoria: 1},
  { value: 'Gerador', label: 'Gerador', categoria: 1},
  { value: 'Blade', label: 'Blade', categoria: 1},
];

const atividades = [
  { value: 'Kick off Meeting', label: 'Kick off Meeting', categoria: 0},
  { value: 'DDS', label: 'DDS', categoria: 0},
  { value: 'Transit Time', label: 'Transit Time', categoria: 0},
  { value: 'Preparação do Ferramental', label: 'Preparação do Ferramental', categoria: 0},
  { value: 'Execução da Atividade', label: 'Execução da Atividade', categoria: 0},
  { value: 'Recolhimento do Ferramental', label: 'Recolhimento do Ferramental', categoria: 0},
  { value: 'Relatório fotográfico', label: 'Relatório fotográfico', categoria: 0},
  { value: 'Interrupção por Solicitação do Cliente', label: 'Interrupção por Solicitação do Cliente', categoria: 0},
  { value: 'Interrupção por condições Climáticas', label: 'Interrupção por condições Climáticas', categoria: 0},
  { value: 'Interrupção por condições Técnicas', label: 'Interrupção por condições Técnicas', categoria: 0},
]

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

class Repair extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keyLabor: 1, keyMaterial: 1, keyParada: 1,
      labor: [], material: [], paradas: [], lista_problemcode: [], lista_resolutioncode: [],
      numero_sr: '', complexo_eolico: '', tiporepair: '', subcategoria: '', sso_tecnico: '', paccase: '', numerotecnicos: 0, problemcode: 'GENERAL', resolutioncode: 'REPAIR',
      data_do_debrief: new Date().toISOString(),
      open: false, vertical: 'top', horizontal: 'center',
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

  handleMudancaParadas = idx => evt => {
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
  handleRemoveParts = idx => () => { this.setState((prevState, props) => ({ material: this.state.labor.filter((s, sidx) => idx !== sidx), keyMaterial: prevState.keyMaterial-1 })); };

  adicionaNovoLabor = () => {
      let _novolabor = { key: this.state.keyLabor, inicio: new Date().toISOString().substring(0,16), fim: new Date().toISOString().substring(0,16), laborcode: 'LBR01', tipohora: 'Aplicada', hourtype:'Regular 1' }
      this.setState((prevState, props) => ({ labor: this.state.labor.concat([_novolabor]), keyLabor: _novolabor.key + 1 }));
  };

  adicionaNovaPart = () => {
      let _novapart = { key: this.state.keyMaterial, partnumber: '', serialnumber:'', quantidade: 1, partnumberout: '', serialnumberout:'', quantidadeout: 1, tipopeca: 'Order' }
      this.setState((prevState, props) => ({ material: this.state.material.concat([_novapart]), keyMaterial: _novapart.key + 1 }));
  };

  adicionaNovaParada = () => {
      let _novaparada = { key: this.state.keyParada }
      this.setState((prevState, props) => ({ paradas: this.state.paradas.concat([_novaparada]), keyParada: _novaparada.key + 1 }));
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

    if(this.state.tiporepair !== '') {
      subcategoria.filter(option => { return option.categoria === this.state.tiporepair.categoria }).map(subcategoria => { return subcategoria.value })
    }

    return (
      <div className="Repair">
        <Header handleMudancaWindfarm = {handleMudancaWindfarm.bind(this)} handleMudancaStatus = {handleMudancaStatus.bind(this)} windfarm={this.state.windfarm} />
        <header className="Repair-header">
          <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> INFORMAÇOES GERAIS: </Typography> </Paper>
            <TextField id="numero_sr" required label="Numero SR" variant="standard" className={classes.textField} value={this.state.numero_sr} onChange={this.handleChange('numero_sr')} margin="normal" />

            <TextField id="complexo_eolico" select required label="Parque Eolico" className={classes.textField} value={this.state.complexo_eolico} onChange={this.handleChange('complexo_eolico')} margin="normal">
              {complexo_eolico.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
            </TextField>

            <TextField id="sso_tecnico" required label="SSO Técnico" variant="standard" className={classes.textField} value={this.state.sso_tecnico} onChange={this.handleChange('sso_tecnico')} margin="normal" />

            <TextField id="paccase" label="PAC Case" variant="standard" className={classes.textField} value={this.state.paccase} onChange={this.handleChange('paccase')} margin="normal" />

            <TextField required id="numerotecnicos" label="Numero Tecnicos" variant="standard" type="number" className={classes.textField} value={this.state.numerotecnicos} onChange={this.handleChange('numerotecnicos')} margin="normal" />

            <TextField id="problemcode" select required label="Problem Code" className={classes.textField} value={this.state.problemcode} onChange={this.handleChange('problemcode')} margin="normal">
              {this.state.lista_problemcode.map(option => ( <MenuItem key={option.key} value={option.value}> {option.value} </MenuItem> ))}
            </TextField>

            <TextField id="resolutioncode" select required label="Resolution Code" className={classes.textField} value={this.state.resolutioncode} onChange={this.handleChange('resolutioncode')} margin="normal">
              {this.state.lista_resolutioncode.map(option => ( <MenuItem key={option.key} value={option.value}> {option.value} </MenuItem> ))}
            </TextField>

            <TextField id="tiporepair" select required label="Tipo intervenção" className={classes.textField} value={this.state.tiporepair} onChange={this.handleChange('tiporepair')} margin="normal">
              { tiporepair.map(option => ( <MenuItem key={option.value} value={option.categoria}> {option.value} </MenuItem> )) }
            </TextField>

            <TextField id="subcategoria" select required label="Subcategoria" className={classes.textField} value={this.state.subcategoria} onChange={this.handleChange('subcategoria')} margin="normal">
              { subcategoria.filter(option => { return option.categoria === this.state.tiporepair }).map(option => ( <MenuItem key={option.value} value={option.value}> {option.value} </MenuItem> )) }
            </TextField>

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> HORAS UTILIZADAS: </Typography> </Paper>
            {this.state.labor.map((atividade, idx) => (
                <div key={atividade.key}>
                    <Paper className={classes.detalhes} elevation={1}>
                        <Typography variant="p" component="p"> Atividade-{atividade.key} </Typography>
                    </Paper>
                    <TextField id="inicio" required label="Inicio atividade" type="datetime-local" variant="standard" value={atividade.inicio} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <TextField id="fim" required label="Fim atividade" type="datetime-local" variant="standard" value={atividade.fim} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <TextField id="descricao" required label="Descricao" type="standard" variant="standard" value={atividade.descricao} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaAtividade(idx)} />
                    <IconButton onClick={this.handleRemoveAtividade(idx)} aria-label="Delete" className={classes.margin}> <DeleteIcon fontSize="small" /> </IconButton>
                </div>
            ))}
            <Button className={classes.botaoplus} onClick={() => {this.adicionaNovoLabor()}} color="secondary"> +Labor </Button>
            <Divider />
            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> MATERIAIS/PEÇAS : </Typography> </Paper>
            {this.state.material.map((material, idx) => (
                <div key={material.key}>
                    <Paper className={classes.detalhes} elevation={1}> <Typography variant="p" component="p"> Peça-{material.key} </Typography> </Paper>
                    <TextField id="partnumber" label="Part Number In" type="standard" variant="standard" value={material.partnumber} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="serialnumber" label="Serial Number In" type="standard" variant="standard" value={material.serialnumber} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="quantidade" label="Quantidade In" type="number" variant="standard" value={material.quantidade} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="partnumberout" label="Part Number Out" type="standard" variant="standard" value={material.partnumberout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="serialnumberout" label="Serial Number Out" type="standard" variant="standard" value={material.serialnumberout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <TextField id="quantidadeout" label="Quantidade Out" type="number" variant="standard" value={material.quantidadeout} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParts(idx)} />
                    <IconButton onClick={this.handleRemoveParts(idx)} aria-label="Delete" className={classes.margin}> <DeleteIcon fontSize="small" /> </IconButton>
                </div>
            ))}
            <Button className={classes.botaoplus} onClick={() => {this.adicionaNovaPart()}} color="secondary"> +Parts </Button>

            <Divider />
            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> PARADAS : </Typography> </Paper>
            {this.state.paradas.map((parada, idx) => (
                <div key={parada.key}>
                    <Paper className={classes.detalhes} elevation={1}> <Typography variant="p" component="p"> Parada- {parada.key} </Typography> </Paper>
                    <TextField id="inicio" required label="Inicio parada" type="datetime-local" variant="standard" value={parada.inicio} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParadas(idx)} />
                    <TextField id="fim" required label="Fim parada" type="datetime-local" variant="standard" value={parada.fim} className={classes.textField} InputLabelProps={{ shrink: true, }} onChange={this.handleMudancaParadas(idx)} />
                    <TextField id="tipo_parada" name="tipo_parada" select required label="Tipo parada" className={classes.textField} value={parada.tipo_parada} onChange={this.handleMudancaParadas(idx)}>
                      {tipo_parada.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                    </TextField>
                    <TextField id="parada_guindaste" name="parada_guindaste" select required label="Categoria Parada" className={classes.textField} value={parada.parada_guindaste} onChange={this.handleMudancaParadas(idx)}>
                      {parada_guindaste.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                    </TextField>
                    <IconButton onClick={this.handleRemoveParts(idx)} aria-label="Delete" className={classes.margin}> <DeleteIcon fontSize="small" /> </IconButton>
                </div>
            ))}
            <Button className={classes.botaoplus} onClick={() => {this.adicionaNovaParada()}} color="secondary"> +Paradas </Button>

            {/*
                <TextField id="tipo_hora" select required label="Tipo de hora" className={classes.textField} value={this.state.tipo_hora} onChange={this.handleChange('tipo_hora')} helperText="Selecione o tipo de hora trabalhada" margin="normal">
                {tipo_hora.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                </TextField>
            */}

            <Button disabled={false} variant="contained" type="submit" color="primary" fullWidth={true} className={classes.button}> Debrifar! </Button>
          </form>
        </header>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} onClose={this.handleClose} ContentProps={{ 'aria-describedby': 'message-id', }} message={ <span id="message-id">Repair enviado com sucesso!</span>} />
      </div>
    );
  }
}

export default withStyles(styles)(Repair);
