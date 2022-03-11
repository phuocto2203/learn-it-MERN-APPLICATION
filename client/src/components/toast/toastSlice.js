import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    show: false,
    message: '',
  },
  reducers: {
    setToastMessage: (state, action) => {
      state.show = true;
      state.message = action.payload;
    },

    hideToastMessage: (state) => {
      state.show = false;
      state.message = '';
    },
  },
});

const { actions, reducer } = toastSlice;
export const { setToastMessage, hideToastMessage } = actions;
export default reducer;
