import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/auth/userSlice';
import modalReducer from '../components/modal/modalSlice';
import toastReducer from '../components/toast/toastSlice';
const rootReducer = {
  user: userReducer,
  modal: modalReducer,
  toast: toastReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
