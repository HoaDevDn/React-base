import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ApolloProvider } from '@apollo/react-hooks';
import { message } from 'antd';

import App from 'App';
import store from 'store';
import { i18n, apolloClient } from 'configs';
import * as serviceWorker from 'serviceWorker';

import 'assets/scss/style.scss';
import 'configs/firebase';

message.config({ top: 25 });

const Main = () => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
