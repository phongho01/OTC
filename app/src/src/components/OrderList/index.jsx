import React, { useState } from 'react';
import styles from './styles.module.scss';
import { orders } from '../../constants/example-data';
import { formatUnits } from '../../utils/token';

export default function OrderList() {
  const [tab, setTab] = useState(0);

  const getExpiry = (seconds) => {
    return new Date(seconds * 1000).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tabHead} ${tab === 0 ? styles.active : ''}`}
          onClick={() => setTab(0)}
        >
          Submitted Orders
        </div>
        <div
          className={`${styles.tabHead} ${tab === 1 ? styles.active : ''}`}
          onClick={() => setTab(1)}
        >
          Received Orders
        </div>
        <div
          className={`${styles.tabHead} ${tab === 2 ? styles.active : ''}`}
          onClick={() => setTab(2)}
        >
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
          {orders.map((item, index) => (
            <tr key={index}>
              <td>ETH - DAI</td>
              <td>{item.state}</td>
              <td className={styles.textCenter}>
                {formatUnits(item.makerAmount)}
              </td>
              <td className={styles.textCenter}>
                {formatUnits(item.takerAmount)}
              </td>
              <td className={styles.textCenter}>
                {item.expiry !== 0 ? getExpiry(item.expiry) : 'Never'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
