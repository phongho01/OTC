import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/account';
import orderListReducer from './slice/orderList';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    orderList: orderListReducer
  },
});
