import { createSlice } from '@reduxjs/toolkit';

const initialState = [

];

export const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state = action.payload;
      return state;
    },
    addOrder: (state, action) => {
      state.push(action.payload);
      return state;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setOrderList, addOrder } = orderListSlice.actions;

export default orderListSlice.reducer;
