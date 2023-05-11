import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Swap from '@src/components/Swap';
import OrderList from '@src/components/OrderList';
import Header from '@src/components/Header';
import { setAccount } from '@src/app/slice/account';
import { setOrderList } from '@src/app/slice/orderList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMakerOrders } from '@src/api/order.api';

function App() {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else {
      dispatch(setAccount(accounts[0]));
    }
  };

  const fetchOrderList = async () => {
    try {
      const { data } = await getMakerOrders(account);
      dispatch(setOrderList(data));
    } catch (error) {
      console.log('error', error);
    }
  };

  const requireSwitchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x61',
                rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
          console.error(err);
        });

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      requireSwitchNetwork();
    } else {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  }, []);

  useEffect(() => {
    if (account) {
      fetchOrderList();
    }
  }, [account]);

  return (
    <div className="app">
      <ToastContainer />
      {<Header handleAccountsChanged={handleAccountsChanged} />}
      <Swap />
      <OrderList />
    </div>
  );
}

export default App;
