import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { MaxUI } from '@maxhub/max-ui';

import '@maxhub/max-ui/dist/styles.css';
import './styles/variables.css';
import './styles/globals.css';

import { App } from './app/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MaxUI>
      <HashRouter>
        <App />
      </HashRouter>
    </MaxUI>
  </React.StrictMode>,
);