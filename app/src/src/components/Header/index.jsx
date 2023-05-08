import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { WETH_TOKEN, DAI_TOKEN } from '../../constants/order';
import { balanceOf } from '../../utils/erc20';
import toast from '../../utils/toast';
import { ethers } from 'ethers';

// eslint-disable-next-line react/prop-types
export default function Header({ handleAccountsChanged }) {
  const account = useSelector((state) => state.account);
  const [balance, setBalance] = useState({
    weth: 0,
    dai: 0,
  });

  const handleClick = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
  };

  const roundNumber = (value) => {
    return Math.round(value * 100000) / 100000;
  };

  const handleFetchBalance = async () => {
    try {
      const weth = await balanceOf(WETH_TOKEN, account);
      const dai = await balanceOf(DAI_TOKEN, account);
      setBalance({
        weth: roundNumber(ethers.utils.formatUnits(weth._hex, 18)),
        dai: roundNumber(ethers.utils.formatUnits(dai._hex, 18)),
      });
    } catch (error) {
      toast.error('Check your network metamask');
    }
  };

  useEffect(() => {
    if (account) {
      handleFetchBalance();
    }
  }, [account]);

  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        <div>
          <span>WETH: {balance.weth} </span>
          <img src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" />
        </div>
        <div>
          <span>DAI: {balance.dai}</span>
          <img src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png" />
        </div>
      </div>
      <div>{!account && <button onClick={handleClick}>Connect Metamask</button>}</div>
    </div>
  );
}
