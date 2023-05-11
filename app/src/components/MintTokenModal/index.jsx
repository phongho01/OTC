import { useState } from 'react';
import styles from './styles.module.scss';
import { WETH_TOKEN, DAI_TOKEN } from '@constants/order';
import { mintToken } from '@utils/erc20';
import toast from '@utils/toast';
import { ethers } from 'ethers';
import ReactLoading from 'react-loading';

export default function MintTokenModal({ handleClose }) {
  const [data, setData] = useState({
    address: WETH_TOKEN,
    value: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleMint = async () => {
    console.log('data', data);
    if (data.value > 0) {
      setIsLoading(true);
      try {
        const tx = await mintToken(data.address, ethers.utils.parseUnits(data.value, 18));
        await tx.wait();
        setIsLoading(false);
        toast.success('Mint successfully');
      } catch (error) {
        setIsLoading(false);
        toast.error('An error occurred while minting');
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <ReactLoading type="spinningBubbles" color="#ffffff" height={60} width={60} />
        </div>
      )}
      <div className={styles.wrap}>
        <div className={styles.title}>Get more WETH - DAI</div>
        <div className={styles.body}>
          <div className={styles.label}>Token:</div>
          <select value={data.address} name="address" onChange={handleOnChange}>
            <option value={WETH_TOKEN}>WETH</option>
            <option value={DAI_TOKEN}>DAI</option>
          </select>
          <div className={styles.label}>Amount:</div>
          <input value={data.value} name="value" type="number" onChange={handleOnChange} />
        </div>
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={() => handleClose(false)}>
            Cancel
          </button>
          <button className={styles.mintBtn} onClick={handleMint}>
            Mint
          </button>
        </div>
      </div>
    </div>
  );
}
