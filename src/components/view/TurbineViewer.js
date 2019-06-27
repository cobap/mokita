import React, { useState, useEffect, useDebugValue } from 'react';
import axios from 'axios';

// Turbine svg
import wtg3 from './../css/wtg3.svg';
import wtg_online from './../css/wtg_online.svg';
import wtg_fault from './../css/wtg_fault.svg';
import wtg_repair from './../css/wtg_repair.svg';
import wtg_maintenance from './../css/wtg_maintenance.svg';
import wtg_nocom from './../css/wtg_nocom.svg';

// Firebase DB
import fire from './../../fire';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TurbineViewer = (props) => {

  const classes = useStyles();

  const [turbines, setTurbines] = useState([]);

  useEffect(() => {
    async function loadTurbineData() {
      if (props.windfarm === '') {
        setTurbines([])
      }
      else {
        const response = await axios.get('https://mokitascada.herokuapp.com/api/scada/' + props.windfarm);
        setTurbines(response.data);
      }
    }
    loadTurbineData();
  }, [props.windfarm]);

  return (<>
    <List component="nav">
      {
        turbines.map((turbina) => {return(
          <ListItem button key={turbina.assetId}>
            {console.log(turbina)}
            <ListItemIcon style={{height: 32}}>
              <TurbineStatus status={turbina.turbine.stateCurrent} />
            </ListItemIcon>
            <ListItemText primary={turbina.displayName} secondary={'MW/h: ' + turbina.turbine.actualPower + " | Wind: " + turbina.turbine.windSpeed}/>
          </ListItem>
        )})
      }
    </List>
  </>);
};

function TurbineStatus(props) {
  const status = props.status;
  if (status === 1 || status === 2 || status === 3) {
    return (<img src={wtg_online} height={32} alt="logo" />);
  }
  else if (status === 5)
    return (<img src={wtg_fault} height={32} alt="logo" />);
  else if (status === 10)
    return (<img src={wtg_repair} height={32} alt="logo" />);
  else if (status === 11)
    return (<img src={wtg_maintenance} height={32} alt="logo" />);
  else if (status === 0){
    return (<img src={wtg_nocom} height={32} alt="logo" />);
  }
  else {
    return (<img src={wtg_repair} height={32} alt="logo" />);
  }
};

// return [{turbines, windfarm }, setWindfarm ];
export default TurbineViewer;



// <ListItemIcon> <TurbineStatus status={turbina.currentState} /> </ListItemIcon>
// <div>
// <List component="nav" subheader={<ListSubheader component="div">Lista de Turbinas</ListSubheader>} className={classes.root} >
//   {turbinas.map((turbina) => {
//     return (
//       <div key={turbina.key}>
//         {turbina.faults != null? (
//           <div>
//             <ListItem button onClick={()=>{this.handleDetalhesFalha(turbina.wtgName)}}>
//               <ListItemIcon style={{height: 32}}>
//                 <TurbineStatus status={turbina.currentState} />
//               </ListItemIcon>
//               <ListItemText inset primary={turbina.wtgName} />
//               {this.state[turbina.wtgName] ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={this.state[turbina.wtgName]} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 {turbina.faults.map((falha) => { return (
//                   <ListItem button key={falha.name} className={classes.nested} onClick={event => this.handleSelecionaTurbina(event, turbina.key)}>
//                     <ListItemIcon>
//                       <TurbineStatus status={turbina.currentState} />
//                     </ListItemIcon>
//                     <ListItemText inset primary={falha.name + ' || ' + falha.time} secondary={falha.text} />
//                   </ListItem>
//                 )})}
//               </List>
//             </Collapse>
//           </div>
//         ) : (
//           <ListItem button key={turbina.key} className={classes.nested} onClick={event => this.handleSelecionaTurbina(event, turbina.key)}>
//             <ListItemIcon>
//               <TurbineStatus status={turbina.currentState} />
//             </ListItemIcon>
//             <ListItemText inset primary={turbina.wtgName} />
//           </ListItem>
//         )}
//       </div>
//     )
//   })}
//
// </List>
// <CriaSR open={this.state.turbina_foi_selecionada} turbina={this.state.turbina_selecionada} handleFechaCriacaoSR = {handleFechaCriacaoSR.bind(this)} handleCriacaoSR = {handleCriacaoSR.bind(this)}/>
// <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }} open={this.state.openResultadoSR} autoHideDuration={6000} onClose={this.handleCloseSnackBar} ContentProps={{ 'aria-describedby': 'message-id',}}
//   message={<span id="message-id">SR Criada com sucesso! Codigo: {this.state.codigo_sr} </span>} action={[
//   <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleCloseSnackBar} >
//       <CloseIcon />
//   </IconButton>,]}
// />
// </div>
