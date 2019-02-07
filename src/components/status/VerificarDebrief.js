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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


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

class CriaSR extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  closeDialog(status) {
    if(status === 0) {
      this.props.handleFechaCriacaoSR('turbina_foi_selecionada');
    }
  }

  componentDidUpdate(prevProps) {
      // if(this.props.detalhes_sr !== prevProps.detalhes_sr) {
      //     this.setState({sr_velha: this.props.detalhes_sr});
      // }
  }

  render() {
    const { classes } = this.props;
    var handleFechaCriacaoSR = this.props.handleFechaCriacaoSR;

    let _labor = []
    let _material = []

    if(this.props.detalhes_debrief) {
      if(typeof this.props.detalhes_debrief.labor !== 'undefined') {
        _labor = this.props.detalhes_debrief.labor
      }
      if(typeof this.props.detalhes_debrief.material !== 'undefined') {
        _material = this.props.detalhes_debrief.material
      }
    }

    if(this.props.detalhes_debrief) {
        return (
            <React.Fragment>
            <Dialog open={this.props.open} onClose={() => handleFechaCriacaoSR('false')} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">Criar SR</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Detalhes de Labor e Material gastos:
              </DialogContentText>

            <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> Geral: </Typography> </Paper>
            <TextField disabled fullWidth id="problemcode" label="Problem Code" variant="standard" className={classes.textField} value={this.props.detalhes_debrief.problemcode} margin="normal" />
            <TextField disabled fullWidth id="resolutioncode" label="Resolution Code" variant="standard" className={classes.textField} value={this.props.detalhes_debrief.resolutioncode} margin="normal" />

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> Labor: </Typography> </Paper>
              <List component="nav">
                {_labor.map(row => (
                <ListItem>
                  <TextField disabled fullWidth id="labor" label="Inicio Labor" variant="standard" className={classes.textField} value={row.inicio} margin="normal" />
                  <TextField disabled fullWidth id="labor" label="Fim Labor" variant="standard" className={classes.textField} value={row.fim} margin="normal" />
                  <TextField disabled fullWidth id="labor" label="Tipo Hora" variant="standard" className={classes.textField} value={row.laborcode} margin="normal" />
                </ListItem>
              ))}
              </List>

            <Paper className={classes.root} elevation={1}> <Typography variant="h5" component="h3"> Materiais: </Typography> </Paper>
              <List component="nav">
                {_material.map(row => (
                <ListItem>
                  <TextField disabled fullWidth id="labor" label="Part Number IN" variant="standard" className={classes.textField} value={row.partnumber} margin="normal" />
                  <TextField disabled fullWidth id="labor" label="Serial Number IN" variant="standard" className={classes.textField} value={row.serialnumber} margin="normal" />
                  <TextField disabled fullWidth id="labor" label="Quantidade IN" variant="standard" className={classes.textField} value={row.quantidade} margin="normal" />

                  <TextField disabled fullWidth id="labor" label="Part Number OUT" variant="standard" className={classes.textField} value={row.partnumberout} margin="normal" />
                  <TextField disabled fullWidth id="labor" label="Serial Number OUT" variant="standard" className={classes.textField} value={row.serialnumberout} margin="normal" />
                  <TextField disabled fullWidth id="labor" label="Quantidade OUT" variant="standard" className={classes.textField} value={row.quantidadeout} margin="normal" />

                  <TextField disabled fullWidth id="labor" label="Tipo Peça" variant="standard" className={classes.textField} value={row.tipopeca} margin="normal" />

                </ListItem>
              ))}
              </List>



            </FormControl>
            </form>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => this.closeDialog(0)} color="primary"> Ok </Button>
            </DialogActions>
            </Dialog>
            </React.Fragment>
        );
    }
    else {
        return (<div></div>);
    }
  }
}

export default withStyles(styles)(CriaSR);
