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

  handleChange = campo_formulario => event => {
      let temp = this.state.sr_velha;

      if(event.target.id === undefined) {
        if(event.target.name === 'tipo_sr') {
            temp['tipo_sr'] = event.target.value
        }
      }
      else {
          temp[event.target.id] = event.target.value
      }

      this.setState({ sr_velha: temp });

  };

  handleChangeTech = campo_formulario => event => {
      this.setState({ [campo_formulario]: event.target.value })
  }

  adicionaNovoTech() {
    let _tech = {};
    _tech.label = this.state.novo_tech;
    _tech.key = _tech.label;

    let temp = this.state.sr_velha;
    temp['lista_techs'].push(_tech)

    this.setState(prevState => ({
      sr_velha: temp,
      novo_tech: ''
    }))

  };

  handleDelete = data => () => {
    let temp = this.state.sr_velha;
    const chipToDelete = temp.lista_techs.indexOf(data);
    temp.lista_techs.splice(chipToDelete, 1);
    this.setState({ sr_velha: temp });
  };

  closeDialog(status) {
    this.setState({ tipo_sr: 'O&M - Non PM', sr_summary: '', lista_techs: [], novo_tech: '', falha: '' });
    if(status === 0) {
      this.props.handleFechaCriacaoSR('turbina_foi_selecionada');
    }
    else {
      this.props.handleCriacaoSR(this.state.sr_velha);
    }
  }

  componentDidUpdate(prevProps) {
      if(this.props.detalhes_sr !== prevProps.detalhes_sr) {
          this.setState({sr_velha: this.props.detalhes_sr});
      }
  }

  render() {
    const { classes } = this.props;
    var handleFechaCriacaoSR = this.props.handleFechaCriacaoSR;

    if(this.props.detalhes_sr) {
        if(this.state.sr_velha !== undefined) {
            return (
                <React.Fragment>
                <Dialog open={this.props.open} onClose={() => handleFechaCriacaoSR('false')} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Criar SR</DialogTitle>
                <DialogContent>
                <DialogContentText>
                Criação de SR Automatica - {this.props.turbina.wtgName + ' | ' + this.props.falha}
                </DialogContentText>

                <form className={classes.form} noValidate>
                <FormControl className={classes.formControl}>

                <TextField autoFocus fullWidth id="sr_summary" required label="Problem Summary" variant="standard" className={classes.textField} value={this.state.sr_velha.sr_summary} onChange={this.handleChange('sr_summary')} margin="normal" />
                <TextField disabled fullWidth id="wtg_name" label="WTG Name" variant="standard" className={classes.textField} value={this.state.sr_velha.wtg} onChange={this.handleChange('wtg_name')} margin="normal" />
                <TextField fullWidth id="falha" required label="SCADA Fault Code" variant="standard" className={classes.textField} value={this.state.sr_velha.falha} onChange={this.handleChange('falha')} margin="normal" />
                <InputLabel htmlFor="max-width">Tipo de SR</InputLabel>
                <Select id="tipo_sr" value={this.state.sr_velha.tipo_sr} onChange={this.handleChange('tipo_sr')} inputProps={{ name: 'tipo_sr', id: 'tipo_sr', }} >
                {tipo_sr.map(option => ( <MenuItem id="tipo_sr" key={option.value} value={option.value}> {option.label} </MenuItem> ))}
                </Select>
                <TextField required fullWidth id="novo_tech" label="Add novo tech" variant="standard" className={classes.textField} value={this.state.novo_tech} onChange={this.handleChangeTech('novo_tech')} margin="normal" />
                <Button onClick={() => {this.adicionaNovoTech()}} color="secondary"> +Tech </Button>
                <Paper className={classes.root}>
                {this.state.sr_velha.lista_techs.map(data => { return ( <Chip key={data.key} icon={<TagFacesIcon />} label={data.label} onDelete={this.handleDelete(data)} className={classes.chip} /> ); })}
                </Paper>
                </FormControl>
                </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => this.closeDialog(0)} color="primary"> Cancelar </Button>
                <Button onClick={() => this.closeDialog(1)} color="primary"> Editar SR </Button>
                </DialogActions>
                </Dialog>
                </React.Fragment>
            );
        }
        else {
            return (<div></div>);
        }
    }
    else {
        return (<div></div>);
    }
  }
}

export default withStyles(styles)(CriaSR);
