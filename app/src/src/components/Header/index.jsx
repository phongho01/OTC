import { useState } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { WETH_TOKEN, DAI_TOKEN } from '../../constants/order';
import { ethers } from 'ethers';
import { useTokenBalance } from '@usedapp/core';
import MintTokenModal from '../MintTokenModal';

// eslint-disable-next-line react/prop-types
export default function Header({ handleAccountsChanged }) {
  const account = useSelector((state) => state.account);

  const [openMintToken, setOpenMintToken] = useState(false);

  const wethBalance = useTokenBalance(WETH_TOKEN, account);
  const daiBalance = useTokenBalance(DAI_TOKEN, account);

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

  return (
    <div className={styles.container}>
      {openMintToken && <MintTokenModal handleClose={setOpenMintToken} />}
      <div className={styles.balance}>
        {wethBalance && (
          <div>
            <span>WETH: {roundNumber(ethers.utils.formatUnits(wethBalance?._hex, 18))} </span>
            <img src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" />
          </div>
        )}
        {daiBalance && (
          <div>
            <span>DAI: {roundNumber(ethers.utils.formatUnits(daiBalance?._hex, 18))}</span>
            <img src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png" />
          </div>
        )}
      </div>
      <div>{!account ? <button onClick={handleClick}>Connect Metamask</button> : <button onClick={() => setOpenMintToken(true)}>Get more WETH/DAI</button>}</div>
    </div>
  );
}
