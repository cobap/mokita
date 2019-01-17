// React
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Components
import ControleGrid from './components/view/ControleGrid';

// Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Main App Styles
import './components/css/index.css';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
          <Route path="/" exact={true} component={ControleGrid} />
      </Switch>
  </ BrowserRouter>
  , document.getElementById('root'));
serviceWorker.register();
