import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home_Page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Home />
);

reportWebVitals();
