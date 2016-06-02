'use strict';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, BrowserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';

const router = (
  <Router history = { BrowserHistory } >
    <Route path = '/' component = { App } />
  </Router>
)

ReactDOM.render(
  router,
  document.querySelector('#root')
)