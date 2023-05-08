import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { formatUnits } from '../../utils/token';
import { getMakerOrders, getTakerOrders } from '../../api/order.api';
import { TOKEN_SYMBOL } from '../../constants/index';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderList, removeOrder } from '../../app/slice/orderList';
import { approveERC20, checkAllowance } from '../../utils/erc20';
import { fillOrder } from '../../utils/fillOrder';
import { AUGUSTUS_ADDRESS, ORDER_STATUS } from '../../constants/order';
import toast from '../../utils/toast';
import { updateOrder } from '../../api/order.api';

export default function OrderList() {
  const account = useSelector((state) => state.account);
  const orderList = useSelector((state) => state.orderList);

  const dispatch = useDispatch();

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
        dispatch(setOrderList([]));
        break;
      }
    }
  };

  const handleFillOrder = async (order) => {
    try {
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

      const isAllowance = await checkAllowance(args.takerAsset, AUGUSTUS_ADDRESS, args.taker, args.takerAmount);
      if (!isAllowance) {
        const tx = await approveERC20(args.takerAsset, AUGUSTUS_ADDRESS, args.takerAmount);
        console.log(tx);
        await tx.wait();
      }

      await Promise.all([
        fillOrder(args, order.signature),
        updateOrder(order._id, { state: ORDER_STATUS.FULFILLMENT })
      ])
      dispatch(removeOrder(order._id));
      toast.success('Fill order successfully');
    } catch (error) {
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
            <th width={'20%'}>Market</th>
            <th width={'20%'}>Status</th>
            <th width={'20%'} className={styles.textCenter}>
              Maker Amount
            </th>
            <th width={'20%'} className={styles.textCenter}>
              Taker Amount
            </th>
            <th width={'20%'} className={styles.textCenter}>
              Expiry
            </th>
            {tab === 1 && (
              <th width={'20%'} className={styles.textCenter}>
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {orderList.map((item, index) => (
            <tr key={index}>
              <td>
                {TOKEN_SYMBOL[item.makerAsset]} - {TOKEN_SYMBOL[item.takerAsset]}
              </td>
              <td>{item.state}</td>
              <td className={styles.textCenter}>{formatUnits(item.makerAmount)}</td>
              <td className={styles.textCenter}>{formatUnits(item.takerAmount)}</td>
              <td className={styles.textCenter}>{item.expiry !== 0 ? getExpiry(item.expiry) : 'Never'}</td>
              {tab === 1 && (
                <td className={styles.textCenter}>
                  <button className={styles.fillBtn} onClick={() => handleFillOrder(item)}>
                    Fill
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
