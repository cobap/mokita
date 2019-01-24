import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
});

const tipo_sr = [
  { value: 'FSA - PM', label: 'FSA - PM' },
  { value: 'FSA - Non PM', label: 'FSA - Non PM' },
  { value: 'O&M - Non PM', label: 'O&M - Non PM' },
  { value: 'O&M - PM', label: 'O&M - PM' },
  { value: 'Customer Request', label: 'Customer Request' },
  { value: 'Warranty', label: 'Warranty' }
];

class CriaSR extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tipo_sr: 'O&M - Non PM',
      sr_summary: '',
      lista_techs: [],
      novo_tech: '',
      falha: '',
    };
  }

  handleChange = campo_formulario => event => { this.setState({ [campo_formulario]: event.target.value, }); };

  adicionaNovoTech() {
    let _tech = {};
    _tech.label = this.state.novo_tech;
    _tech.key = _tech.label;

    this.setState(prevState => ({
      lista_techs: [...prevState.lista_techs, _tech],
      novo_tech: ''
    }))

  };

  handleDelete = data => () => {
    this.setState(state => {
      const lista_techs = [...state.lista_techs];
      const chipToDelete = lista_techs.indexOf(data);
      lista_techs.splice(chipToDelete, 1);
      return { lista_techs };
    });
  };

  closeDialog(status) {
    this.setState({ tipo_sr: 'O&M - Non PM', sr_summary: '', lista_techs: [], novo_tech: '', falha: '' });
    if(status === 0) {
      this.props.handleFechaCriacaoSR('turbina_foi_selecionada');
    }
    else {
      let _sr = {}
      _sr.tipo_sr = this.state.tipo_sr;
      _sr.sr_summary = this.state.sr_summary;
      _sr.lista_techs = this.state.lista_techs;
      _sr.wtg = this.props.turbina.wtgName;
      _sr.serial = this.props.turbina.serial;
      _sr.falha = this.state.falha;
      _sr.data = new Date().toISOString().substring(0,16)
      _sr.key = _sr.wtg + _sr.data.replace(':', '').replace('T', '').replace(new RegExp('-', 'g'), '');
      this.props.handleCriacaoSR(_sr);
    }
  }

  componentDidUpdate(prevProps) {
      // if(this.props.detalhes_sr) {
      //     if(this.props.turbina === false ) {
      //         this.setState({
      //             tipo_sr: this.props.detalhes_sr.tipo_sr,
      //             sr_summary: this.props.detalhes_sr.sr_summary,
      //             lista_techs: this.props.detalhes_sr.lista_techs,
      //             falha: this.props.detalhes_sr.falha,
      //         });
      //     }
      // }
  }

  render() {
    const { classes } = this.props;
    var handleFechaCriacaoSR = this.props.handleFechaCriacaoSR;
    // var handleCriacaoSR = this.props.handleCriacaoSR;


    return (
      <React.Fragment>
        <Dialog open={this.props.open} onClose={() => handleFechaCriacaoSR('turbina_foi_selecionada')} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Criar SR</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Criação de SR Automatica - {this.props.turbina.wtgName + ' | ' + this.props.falha}
            </DialogContentText>

            <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <TextField autoFocus fullWidth id="sr_summary" required label="Problem Summary" variant="standard" className={classes.textField} value={this.state.sr_summary} onChange={this.handleChange('sr_summary')} margin="normal" />
                <TextField disabled fullWidth id="wtg_name" label="WTG Name" variant="standard" className={classes.textField} value={this.props.turbina.wtgName} onChange={this.handleChange('wtg_name')} margin="normal" />
                <TextField fullWidth id="em_scada" required label="SCADA Fault Code" variant="standard" className={classes.textField} value={this.state.falha} onChange={this.handleChange('falha')} margin="normal" />
                <InputLabel htmlFor="max-width">Tipoe de SR</InputLabel>
                <Select value={this.state.tipo_sr} onChange={this.handleChange('tipo_sr')} inputProps={{ name: 'max-width', id: 'max-width', }} >
                  {tipo_sr.map(option => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                </Select>
                <TextField required fullWidth id="novo_tech" label="Add novo tech" variant="standard" className={classes.textField} value={this.state.novo_tech} onChange={this.handleChange('novo_tech')} margin="normal" />
                <Button onClick={() => {this.adicionaNovoTech()}} color="secondary"> +Tech </Button>
                <Paper className={classes.root}>
                  {this.state.lista_techs.map(data => { return ( <Chip key={data.key} icon={<TagFacesIcon />} label={data.label} onDelete={this.handleDelete(data)} className={classes.chip} /> ); })}
                </Paper>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeDialog(0)} color="primary"> Cancelar </Button>
            <Button onClick={() => this.closeDialog(1)} color="primary"> Criar SR </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CriaSR);
