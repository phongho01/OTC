import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { HiSwitchVertical } from 'react-icons/hi';
import { BiReset } from 'react-icons/bi';
import { EXPIRY_OPTIONS } from '../../constants';
import { ethers } from 'ethers';
import { getPrice } from '../../utils/getPrice';
import { formatNumber, diffPercent } from '../../utils/formatNumber';
import { getTakerOrders } from '../../api/order.api';

export default function Swap() {
  const [isLoading, setIsLoading] = useState(true);
  const [originalRate, setOriginalRate] = useState(0);
  const [selectionExpiry, setSelectionExpiry] = useState(0);

  const [fromToken, setFromToken] = useState({
    img: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png',
    symbol: 'ETH',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
  });

  const [toToken, setToToken] = useState({
    img: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  });

  const [inputData, setInputData] = useState({
    pay: 1,
    rate: 1800,
    receive: 1800,
    taker: '',
    expiry: 0
  });

  const handleChange = (e) => {
    const newInputData = {...inputData, [e.target.name]: e.target.value};
    if(e.target.name === 'pay' || e.target.name === 'rate') {
      newInputData.receive = formatNumber(newInputData.pay * newInputData.rate, 2);
    } else if (e.target.name === 'receive') {
      newInputData.rate = formatNumber(newInputData.receive / newInputData.pay);
    }

    setInputData(newInputData);
  }

  const handleSwitchToken = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  }

  const handleSelectionExpiry = (e) => {
    setSelectionExpiry(e.target.value);
    if(e.target.value != 0) {
      setInputData({...inputData, expiry: inputData.expiry || 1});
    } else {
      setInputData({...inputData, expiry: 0});
    }
  }

  const handleSubmit = () => {
    console.log('submit', inputData);
  }

  const initData = async () => {
    try {
      const rate = await getPrice(fromToken.address, toToken.address, ethers.parseUnits(inputData.pay.toString(), 18));
      setInputData({
        ...inputData,
        rate,
        receive: inputData.pay * rate
      })
      setOriginalRate(rate);
      setIsLoading(false);
    } catch (error) {
      console.log('init', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    initData();
  }, []);

  if(isLoading) return <></>;

  return (
    <div className={styles.container}>
        <div className={styles.title}>OTC</div>
        <div className={styles.inputControl}>
            <div className={styles.label}>Pay</div>
            <div className={styles.inputWrap}>
              <input value={inputData.pay} name="pay" onChange={handleChange} required />
              <div className={styles.tokenWrap}>
                <img src={fromToken.img} />
                <span>{fromToken.symbol}</span>
              </div>
            </div>
        </div>
        <div className={styles.inputControlMultiple}>
          <div className={styles.inputControl}>
              <div className={styles.label}>
                <span>Rate { originalRate !== inputData.rate ? diffPercent(originalRate, inputData.rate) : '' }</span>
                <BiReset size={20} color='#ffffff' cursor='pointer' onClick={initData} />
              </div>
              <div className={styles.inputWrap}>
                <input value={inputData.rate} name="rate" onChange={handleChange} required  />
                <span>{toToken.symbol}</span>
              </div>
          </div>
          <div className={styles.inputControl}>
              <div className={styles.label}>Expiry</div>
              <div className={styles.inputWrap}>
                <input value={inputData.expiry} name="expiry" onChange={handleChange} disabled={selectionExpiry == 0} required  />
                <select value={selectionExpiry} onChange={handleSelectionExpiry} name='selectionExpiry' >
                  {EXPIRY_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  )) }
                </select>
              </div>
          </div>
        </div>
        <div className={styles.switchToken}>
          <HiSwitchVertical size={24} color='#fff' cursor='pointer' onClick={handleSwitchToken} />  
        </div>  
        <div className={styles.inputControl}>
            <div className={styles.label}>Receive</div>
            <div className={styles.inputWrap}>
              <input value={inputData.receive} name="receive" onChange={handleChange} required />
              <div className={styles.tokenWrap}>
                <img src={toToken.img} />
                <span>{toToken.symbol}</span>
              </div>
            </div>
        </div>
        <div className={styles.inputControl}>
            <div className={styles.label}>Taker address</div>
            <div className={styles.inputWrap}>
              <input value={inputData.taker} name="taker" onChange={handleChange} required />
            </div>
        </div>
        <button type='button' className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
    </div>
  )
}
