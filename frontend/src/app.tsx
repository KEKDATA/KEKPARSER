import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { history } from './lib/browser_history';

import StackPages from './pages/StackPages';

import { connection } from './socket';

import 'reset-css';

import './variables/styles.pcss';
import './styles.pcss';

connection();

ReactDOM.render(
  <Router history={history}>
    <StackPages />
  </Router>,
  document.getElementById('root'),
);
