import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';

import store from 'store';
import { i18n, apolloClient } from 'configs';
import * as serviceWorker from 'serviceWorker';

import App from './App';
import 'assets/scss/style.scss';
import 'configs/firebase';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <App />
        <ToastContainer />
      </I18nextProvider>
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
