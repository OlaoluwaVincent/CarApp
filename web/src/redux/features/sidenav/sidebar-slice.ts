import { createSlice } from '@reduxjs/toolkit';

const initData = {
  show: 'show',
};

export const sidebar = createSlice({
  name: 'product',
  initialState: initData,
  reducers: {
    toggleShow: (state, action: {
      payload: string;
      type: string;
    }) => {
      state.show = action.payload;
    },
  },
});

export const { toggleShow } = sidebar.actions;

export default sidebar.reducer;
