import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { formatUnits } from '../../utils/token';
import { getMakerOrders, getTakerOrders, orderHistory, updateOrder } from '../../api/order.api';
import { TOKEN_SYMBOL } from '../../constants/index';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderList, removeOrder } from '../../app/slice/orderList';
import { approveERC20, checkAllowance } from '../../utils/erc20';
import { fillOrder, cancelOrder } from '../../utils/order';
import { AUGUSTUS_ADDRESS, ORDER_STATUS } from '../../constants/order';
import toast from '../../utils/toast';
import ReactLoading from 'react-loading';

export default function OrderList() {
  const account = useSelector((state) => state.account);
  const orderList = useSelector((state) => state.orderList);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(0);

  const getExpiry = (seconds) => {
    return new Date(seconds * 1000).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  };

  const getOrderList = async (index) => {
    switch (index) {
      case 0: {
        const { data } = await getMakerOrders(account);
        dispatch(setOrderList(data));
        break;
      }
      case 1: {
        const { data } = await getTakerOrders(account);
        dispatch(setOrderList(data));
        break;
      }
      case 2: {
        const { data } = await orderHistory(account);
        dispatch(setOrderList(data));
        break;
      }
    }
  };

  const handleFillOrder = async (order) => {
    try {
      setIsLoading(true);
      const args = {
        nonceAndMeta: order.nonceAndMeta,
        expiry: order.expiry,
        makerAsset: order.makerAsset,
        takerAsset: order.takerAsset,
        maker: order.maker,
        taker: order.taker,
        makerAmount: order.makerAmount,
        takerAmount: order.takerAmount,
      };

      while (!(await checkAllowance(args.takerAsset, AUGUSTUS_ADDRESS, args.taker, args.takerAmount))) {
        const tx = await approveERC20(args.takerAsset, AUGUSTUS_ADDRESS, args.takerAmount);
        await tx.wait();
      }

      const tx = await fillOrder(args, order.signature);
      await tx.wait();
      await updateOrder(order._id, { state: ORDER_STATUS.FULFILLMENT });
      dispatch(removeOrder(order._id));
      toast.success('Fill order successfully');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
      toast.error('An error has been occur');
    }
  };

  const handleCancelOrder = async (order) => {
    try {
      setIsLoading(true);
      const args = {
        nonceAndMeta: order.nonceAndMeta,
        expiry: order.expiry,
        makerAsset: order.makerAsset,
        takerAsset: order.takerAsset,
        maker: order.maker,
        taker: order.taker,
        makerAmount: order.makerAmount,
        takerAmount: order.takerAmount,
      };
      const tx = await cancelOrder(args);
      await tx.wait();
      await updateOrder(order._id, { state: ORDER_STATUS.CANCELLATION });
      dispatch(removeOrder(order._id));
      toast.success('Cancel order successfully');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
      toast.error('An error has been occur');
    }
  };

  useEffect(() => {
    if (account) {
      getOrderList(tab);
    }
  }, [tab, account]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <ReactLoading type="spinningBubbles" color="#ffffff" height={60} width={60} />
        </div>
      )}
      <div className={styles.tabs}>
        <div className={`${styles.tabHead} ${tab === 0 ? styles.active : ''}`} onClick={() => setTab(0)}>
          Submitted Orders
        </div>
        <div className={`${styles.tabHead} ${tab === 1 ? styles.active : ''}`} onClick={() => setTab(1)}>
          Received Orders
        </div>
        <div className={`${styles.tabHead} ${tab === 2 ? styles.active : ''}`} onClick={() => setTab(2)}>
          Order History
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th width={'15%'}>Market</th>
            <th width={'20%'} className={styles.textCenter}>
              Maker Amount
            </th>
            <th width={'15%'} className={styles.textCenter}>
              Taker Amount
            </th>
            <th width={'15%'} className={styles.textCenter}>
              Expiry
            </th>
            <th width={'20%'}>Status</th>
            <th width={'15%'} className={styles.textCenter}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((item, index) => (
            <tr key={index}>
              <td>
                {TOKEN_SYMBOL[item.makerAsset]} - {TOKEN_SYMBOL[item.takerAsset]}
              </td>
              <td className={styles.textCenter}>{formatUnits(item.makerAmount)}</td>
              <td className={styles.textCenter}>{formatUnits(item.takerAmount)}</td>
              <td className={styles.textCenter}>{item.expiry !== 0 ? getExpiry(item.expiry) : 'Never'}</td>
              <td>{item.state}</td>
              {tab === 0 && (
                <td className={styles.textCenter}>
                  <button className={styles.fillBtn} onClick={() => handleCancelOrder(item)}>
                    Cancel
                  </button>
                </td>
              )}
              {tab === 1 && (
                <td className={styles.textCenter}>
                  <button className={styles.fillBtn} onClick={() => handleFillOrder(item)}>
                    Fill
                  </button>
                </td>
              )}
              {tab === 2 && (
                <td className={styles.textCenter}>
                  <button className={styles.fillBtn} onClick={() => handleCancelOrder(item)}>
                    View
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
