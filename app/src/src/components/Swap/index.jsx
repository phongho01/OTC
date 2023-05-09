import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { HiSwitchVertical } from 'react-icons/hi';
import { BiReset } from 'react-icons/bi';
import { EXPIRY_OPTIONS } from '../../constants';
import { ethers } from 'ethers';
import { getPrice, createOrderStructure } from '../../utils/paraswap';
import { formatNumber, diffPercent } from '../../utils/formatNumber';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../api/order.api';
import ReactLoading from 'react-loading';
import toast from '../../utils/toast';
import { addOrder } from '../../app/slice/orderList';
import { approveERC20, checkAllowance } from '../../utils/erc20';
import { AUGUSTUS_ADDRESS } from '../../constants/order';

export default function Swap() {
  const account = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [originalRate, setOriginalRate] = useState(0);
  const [selectionExpiry, setSelectionExpiry] = useState(0);

  const [fromToken, setFromToken] = useState({
    img: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png',
    symbol: 'WETH',
    address: '0x0d1F718A3079d3B695C733BA2a726873A019299a',
  });

  const [toToken, setToToken] = useState({
    img: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    symbol: 'DAI',
    address: '0xF5B217Af5d3c828BDaEE078837b8b22cD2cBe615',
  });

  const [inputData, setInputData] = useState({
    pay: 1,
    rate: 1800,
    receive: 1800,
    taker: '',
    expiry: 0,
  });

  const handleChange = (e) => {
    const newInputData = { ...inputData, [e.target.name]: e.target.value };
    if (e.target.name === 'pay' || e.target.name === 'rate') {
      newInputData.receive = formatNumber(newInputData.pay * newInputData.rate, 18);
    } else if (e.target.name === 'receive') {
      newInputData.rate = formatNumber(newInputData.receive / newInputData.pay, 18);
    }

    setInputData(newInputData);
  };

  const handleSwitchToken = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleSelectionExpiry = (e) => {
    setSelectionExpiry(e.target.value);
    if (e.target.value != 0) {
      setInputData({ ...inputData, expiry: inputData.expiry || 1 });
    } else {
      setInputData({ ...inputData, expiry: 0 });
    }
  };

  const handleSubmit = async () => {
    if(inputData.taker === account) {
      toast.error('Taker must not be the same as maker');
      return;
    }
    try {
      setIsLoading(true);
      const args = {
        maker: account,
        makerAsset: fromToken.address,
        takerAsset: toToken.address,
        makerAmount: ethers.utils.parseUnits(inputData.pay.toString(), 18),
        takerAmount: ethers.utils.parseUnits(inputData.receive.toString(), 18),
        expiry: inputData.expiry * selectionExpiry,
        taker: inputData.taker,
      };
      if (!args.maker || !args.taker || !args.makerAmount || !args.takerAmount) {
        toast.error('Invalid input data');
        return;
      }

      while(!(await checkAllowance(args.makerAsset, AUGUSTUS_ADDRESS, args.maker, args.makerAmount))) {
        const tx = await approveERC20(args.makerAsset, AUGUSTUS_ADDRESS, args.makerAmount);
        await tx.wait();
      }
     const orderData = await createOrderStructure(args);
      const { data } = await createOrder(orderData);
      dispatch(addOrder(data));
      setIsLoading(false);
      toast.success('Create new order successfully');
    } catch (error) {
      setIsLoading(false);
      console.log('submit error: ' + error);
      toast.error('An error has been occur');
    }
  };

  const fetchPrice = async () => {
    const rate = await getPrice(fromToken.address, toToken.address, ethers.utils.parseUnits('1', 18));
    setInputData({
      ...inputData,
      rate,
      receive: inputData.pay * rate,
    });
    setOriginalRate(rate);
  };

  const initData = async () => {
    try {
      setIsLoading(true);
      await fetchPrice();
      setIsLoading(false);
    } catch (error) {
      console.log('init', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, [fromToken, toToken]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <ReactLoading type="spinningBubbles" color="#ffffff" height={60} width={60} />
        </div>
      )}
      <div className={styles.title}>OTC</div>
      <div className={styles.inputControl}>
        <div className={styles.label}>Pay</div>
        <div className={styles.inputWrap}>
          <input type="number" value={inputData.pay} name="pay" onChange={handleChange} required />
          <div className={styles.tokenWrap}>
            <img src={fromToken.img} />
            <span>{fromToken.symbol}</span>
          </div>
        </div>
      </div>
      <div className={styles.inputControlMultiple}>
        <div className={styles.inputControl}>
          <div className={styles.label}>
            <span>Rate {originalRate !== inputData.rate ? diffPercent(originalRate, inputData.rate) : ''}</span>
            <BiReset size={20} color="#ffffff" cursor="pointer" onClick={initData} />
          </div>
          <div className={styles.inputWrap}>
            <input type="number" value={inputData.rate} name="rate" onChange={handleChange} required />
            <span>{toToken.symbol}</span>
          </div>
        </div>
        <div className={styles.inputControl}>
          <div className={styles.label}>Expiry</div>
          <div className={styles.inputWrap}>
            <input type="number" value={inputData.expiry} name="expiry" onChange={handleChange} disabled={selectionExpiry == 0} required />
            <select value={selectionExpiry} onChange={handleSelectionExpiry} name="selectionExpiry">
              {EXPIRY_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.switchToken}>
        <HiSwitchVertical size={24} color="#fff" cursor="pointer" onClick={handleSwitchToken} />
      </div>
      <div className={styles.inputControl}>
        <div className={styles.label}>Receive</div>
        <div className={styles.inputWrap}>
          <input type="number" value={inputData.receive} name="receive" onChange={handleChange} required />
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
      <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
