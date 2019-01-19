// React
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Components
import ControleGrid from './components/view/ControleGrid';
import Debrief from './components/view/Debrief';
import Visualizador from './components/view/Visualizador';
import PCM from './components/view/PCM';

// Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Main App Styles
import './components/css/index.css';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
          <Route path="/" exact={true} component={ControleGrid} />
          <Route path="/debrifar" exact={true} component={Debrief} />
          <Route path="/lista" exact={true} component={Visualizador} />
          <Route path="/pcm" exact={true} component={PCM} />
      </Switch>
  </ BrowserRouter>
  , document.getElementById('root'));
serviceWorker.register();
