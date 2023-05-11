import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BSCTestnet, DAppProvider } from '@usedapp/core';
import { ethers } from 'ethers';

const config = {
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [BSCTestnet.chainId]: new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'),
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <DAppProvider config={config}>
    <Provider store={store}>
      <App />
    </Provider>
  </DAppProvider>
);
