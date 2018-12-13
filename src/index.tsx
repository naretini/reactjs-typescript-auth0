import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Router>
    <Route component={App} />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

