'use strict';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const darkMuiTheme = getMuiTheme(darkBaseTheme);

const router = (
  <MuiThemeProvider muiTheme={darkMuiTheme}>
    <Router history = { browserHistory } >
      <Route path = '/' component = { App } />
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(
  router,
  document.querySelector('#root')
)