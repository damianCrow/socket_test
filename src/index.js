import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApiConnectedApp from './Api';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ApiConnectedApp />, document.getElementById('root'));
registerServiceWorker();
