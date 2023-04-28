import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { formatUnits } from '../../utils/token';
import { getMakerOrders } from '../../api/order.api';
import { TOKEN_SYMBOL } from '../../constants/index';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderList } from '../../app/slice/orderList';

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
        dispatch(setOrderList([]));
        break;
      }
      case 2: {
        dispatch(setOrderList([]));
        break;
      }
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
