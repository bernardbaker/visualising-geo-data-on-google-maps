import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import './index.scss';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

let state = {
  features: [],
  showingDetails: false,
  selectedDataPointItem: {},
  materialList: [],
  selectValueForSizeCategory: 'All',
  selectValueForMaterial: 'All',
  geo: {}
};

ReactDOM.render(
  <Provider store={configureStore(state)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
