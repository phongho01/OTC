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
      console.log('error', error)
    }
  }

  useEffect(() => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });

    window.ethereum.on('accountsChanged', handleAccountsChanged);
  }, []);

  useEffect(() => {
    if(account) {
      fetchOrderList();
    }
  }, [account])

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
