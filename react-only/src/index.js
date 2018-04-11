import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Keycloak from 'keycloak-js';

const keycloak = Keycloak('/keycloak.json');
keycloak.init({ onLoad: 'login-required' }).then(function(authenticated) {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
}).catch(function() {
    console.log('failed to initialize');
});



