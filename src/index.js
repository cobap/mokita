// React
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Components
import ControleGrid from './components/view/ControleGrid';
import Debrief from './components/view/Debrief';
import Visualizador from './components/view/Visualizador';
import VisualizadorDebrief from './components/view/VisualizadorDebrief';
import VisualizadorAprovacao from './components/view/VisualizadorAprovacao';
import PCM from './components/view/PCM';
import Repair from './components/view/Repair';
import ListTurbines from './components/view/ListTurbines';

// Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Main App Styles
import './components/css/index.css';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
          {/*
            <Route path="/" exact={true} component={ControleGrid} />
          */}
          <Route path="/" exact={true} component={ListTurbines} />
          <Route path="/turbineviewer" exact={true} component={ListTurbines} />
          <Route path="/debrifar" exact={true} component={Debrief} />
          <Route path="/lista" exact={true} component={Visualizador} />
          <Route path="/debriefs" exact={true} component={VisualizadorDebrief} />
          <Route path="/aprovacao" exact={true} component={VisualizadorAprovacao} />
          <Route path="/pcm" exact={true} component={PCM} />
          <Route path="/repair" exact={true} component={Repair} />
      </Switch>
  </ BrowserRouter>
  , document.getElementById('root'));
serviceWorker.register();
