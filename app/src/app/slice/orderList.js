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
    },
    removeOrder: (state, action) => {
      return state.filter(item => item._id !== action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const { setOrderList, addOrder, removeOrder } = orderListSlice.actions;

export default orderListSlice.reducer;
