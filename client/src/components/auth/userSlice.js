import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
// import userApi from "../../api/userApi";
import apiUrl from '../../constant/apiUrl';
import StorageKeys from '../../constant/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  //call api to register
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, payload);

    //save token to local storage
    localStorage.setItem(StorageKeys.TOKEN, response.data.accessToken || '');
    localStorage.setItem(StorageKeys.USER, response.data.username || '');

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const login = createAsyncThunk('user/login', async (payload) => {
  try {
    //call api to login
    const response = await axios.post(`${apiUrl}/auth/login`, payload);

    //save token to local storage
    localStorage.setItem(StorageKeys.TOKEN, response.data.accessToken);
    localStorage.setItem(StorageKeys.USER, response.data.username || '');

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

// check if user is authenticated on the server SOMETHING WRONG HERE!!!!!!
export const loadUser = createAsyncThunk('user/auth', async () => {
  if (localStorage.getItem(StorageKeys.TOKEN)) {
    setAuthToken(localStorage.getItem(StorageKeys.TOKEN));
  }
  try {
    const response = await axios.get(`${apiUrl}/auth`);
    return response.data;
  } catch (error) {
    localStorage.removeItem('access_token');
    setAuthToken(null);
    return error.response.data;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: localStorage.getItem(StorageKeys.USER),
    isAuthenticated: false,
  },
  reducers: {
    logout(state) {
      //empty state
      state.currentUser = '';
      state.isAuthenticated = false;

      //clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      //clear axios request headers
      if (axios.defaults.headers.common['Authorization']) {
        delete axios.defaults.headers.common['Authorization'];
      }
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.currentUser = action.payload.username;
      state.isAuthenticated = action.payload.success;
    },
    [login.fulfilled]: (state, action) => {
      state.currentUser = action.payload.username;
      state.isAuthenticated = action.payload.success;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.isAuthenticated = action.payload.success;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
