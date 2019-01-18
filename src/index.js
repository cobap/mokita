// React
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Components
import ControleGrid from './components/view/ControleGrid';
import Debrief from './components/view/Debrief';

// Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Main App Styles
import './components/css/index.css';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
          <Route path="/" exact={true} component={ControleGrid} />
          <Route path="/debrifar" exact={true} component={Debrief} />
      </Switch>
  </ BrowserRouter>
  , document.getElementById('root'));
serviceWorker.register();
