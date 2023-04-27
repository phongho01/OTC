import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Swap from './src/components/Swap'
import OrderList from './src/components/OrderList'
import { setAccount } from './src/app/slice/account'

function App() {
  const dispatch = useDispatch()

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.')
    } else {
      dispatch(setAccount(accounts[0]))
    }
  }

  useEffect(() => {
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err)
      })

    window.ethereum.on('accountsChanged', handleAccountsChanged)
  }, [])

  return (
    <div className="app">
      <Swap />
      <OrderList />
    </div>
  )
}

export default App
